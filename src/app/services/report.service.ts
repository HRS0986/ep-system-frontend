import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from "@angular/fire/functions";
import { ArrearsReport, CashCollectionReport, Customer, CustomerReport, EPReport, FnResponse, Ledger, Report } from "../types";
import {firstValueFrom, Observable} from "rxjs";
import { collection, collectionData, Firestore, limit, orderBy, query, where } from "@angular/fire/firestore";
import { Particulars} from "../constants";
import { CollectionReference } from "@firebase/firestore";
import * as XLSX from "xlsx";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import { CustomerService } from "./customer.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
      private firestore: Firestore,
      private functions: Functions,
      private clientService: CustomerService,
  ) { }

  public async GetReport(startDate: string, endDate: string): Promise<FnResponse<Report[]>> {
    const GetReport = httpsCallable<{startDate: string, endDate: string}, FnResponse>(this.functions, 'getReport');
    const res = await GetReport({ startDate, endDate });
    return res.data;
  }

  public async GetCustomerReport(): Promise<FnResponse<CustomerReport[]>> {
    const clients: Customer[] = await firstValueFrom(this.clientService.GetAllClientData());
    let no = 1;
    const data = clients.map((client: Customer): CustomerReport => {
      return {
        No: (no++).toString(),
        DateOfSale:  client.SaleDate as Date,
        Project: client.Project,
        BlockNo: client.BlockNo.toString(),
        CardNo: client.ID as string,
        CustomerName: client.Name,
        Address: client.Address,
        IDNumber: client.NIC,
        ContactNo: client.PrimaryContactNo,
        Note: client.Note,
      }
    });
    return {
      status: true,
      message: 'Customer Report',
      data: data,
    };
  }

  public async GetCashReport(startDate: string, endDate: string): Promise<FnResponse<CashCollectionReport[]>> {
    const data: CashCollectionReport[] = [];
    const clients: Customer[] = await firstValueFrom(this.clientService.GetAllClientData());
    for (const client of clients) {
      const ledgerRef = collection(this.firestore, `Clients/${client.ID}/Ledger`);
      const q1 = query(
          ledgerRef,
          where('Date', '<=', new Date(endDate)),
          orderBy('Date', 'desc')
      );
      let ledger: Ledger[] = await firstValueFrom(collectionData(q1, {idField: 'ID'}) as Observable<Ledger[]>);
      const _ledger = ledger.filter((l: Ledger) => {
        const date = (l.Date as Timestamp).toDate();
        return date >= new Date(startDate) &&
            date <= new Date(endDate) &&
            (l.Particulars === Particulars["PAID_BY_CASH"].value || l.Particulars === Particulars["PAID_BY_CHEQUE"].value);
      });
      _ledger.forEach((l: Ledger) => {
        data.push({
          Date: l.Date as Date,
          BillNo: l.RefNo.toString(),
          LotNo: client.BlockNo.toString(),
          Project: client.Project,
          Sale: l.Amount.toString(),
          EP: client.TotalReceivableBalance.toString(),
          Advance: client.AdvancePayment.toString(),
          FullPayment: client.TotalReceivableBalance.toString(),
          DeedAndPlan: "",
        });
      });
    }
    return {
      status: true,
      message: 'Customer Report',
      data: data,
    };
  }

  public async GetEPReport(): Promise<FnResponse<EPReport[]>> {
    const data: EPReport[] = [];
    const clients: Customer[] = await firstValueFrom(this.clientService.GetCurrentClientData());

    for (const client of clients) {
      const epDetail: EPReport = {
        Project: client.Project,
        BlockNo: client.BlockNo,
        RentalDate: client.FirstRentalDate as Date,
        NumberOfMonth: client.MonthCount,
        EPValue: client.TotalReceivableBalance,
        Capital: client.PaymentEPBalance,
        Interest: client.IntPlusEPSaleValue / 12 * client.MonthCount,
        DocumentCharge: client.DocumentFee,
      }
      data.push(epDetail);
    }

    return {
      status: true,
      message: 'EP Details Report',
      data: data,
    };
  }

  public async GetArrearsReport(): Promise<FnResponse<ArrearsReport[]>> {
    const data: ArrearsReport[] = [];
    const clientRef = collection(this.firestore, 'Clients') as  CollectionReference<Customer>;
    const q1 = query(
        clientRef,
        where('IsActive', '==', true),
        where('IsSettled', '==', false),
    );
    const _clients = await firstValueFrom(collectionData(q1, {idField: 'ID'}));

    const clients = await Promise.all(_clients.map( async (client: Customer) => {
      const ledgerRef = collection(this.firestore, `Clients/${client.ID}/Ledger`) as  CollectionReference<Ledger>;
      const q2 = query(
          ledgerRef,
          where('Date', '<=', new Date()),
          orderBy('Date', 'desc'),
          limit(1),
      );
      const ledger = await firstValueFrom(collectionData(q2, {idField: 'ID'}));
      if (ledger && ledger.length > 0) {
        client.Arrears = ledger[0].Arrears;
      } else {
        client.Arrears = undefined;
      }
      return client;
    }));

    for(const client of clients) {
      if (client.Arrears == undefined || client.Arrears <= 0) continue;

      const ledgerRef = collection(this.firestore, `Clients/${client.ID}/Ledger`) as  CollectionReference<Ledger>;
      const q1 = query(
          ledgerRef,
          orderBy('Date', 'desc'),
          where('Date', '<=', new Date()),
          where('Particulars', '==', Particulars['MONTHLY_RENTAL'].value),
          limit(3),
      );
      const ledger = await firstValueFrom(collectionData(q1, {idField: 'ID'}));
      if (ledger.length == 0) continue;

      const arrearsRecord: ArrearsReport = {
        Project: client.Project,
        BlockNo: client.BlockNo.toString(),
        Arrears_3_31: 0,
        MonthlyRental: client.MonthRental,
        TotalArrears: client.Arrears!,
        ArrearsRate: 0,
        Days30: 0,
        Days60: 0,
        Days90: 0,
        Days90More: 0,
        Name: client.Name,
        ContactNo: client.PrimaryContactNo,
      };

      try {
        let arrears = 0;
        arrears = client.MonthRental - (ledger[0].Arrears - client.Arrears!);
        arrearsRecord.Days30 = arrears > 0 && ledger[0].Arrears > 0 ? arrears : 0;

        arrears = ledger[0].Arrears - ledger[1].Arrears;
        arrearsRecord.Days60 = arrears > 0 && ledger[1].Arrears > 0 ? arrears : 0;

        arrears = ledger[1].Arrears - ledger[2].Arrears;
        arrearsRecord.Days90 = arrears > 0 && ledger[2].Arrears > 0 ? arrears : 0;

        arrearsRecord.Days90More = ledger[2].Arrears > 0 ? ledger[2].Arrears : 0;
      } catch (e) { }

      data.push(arrearsRecord);
    }

    return {
      status: true,
      message: 'Arrears Report',
      data: data,
    };
  }

  public exportToExcel(filename: string, table: HTMLTableElement) {
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename);
  }

}
