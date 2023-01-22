import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
  updateDoc,
  doc, docData, setDoc, where, limit
} from "@angular/fire/firestore";
import { concatMap, firstValueFrom, Observable } from "rxjs";
import { Customer, FnResponse, Ledger } from "../types";
import { CollectionReference, DocumentReference } from "@firebase/firestore";
import { AuthService } from "./auth.service";
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
      private firestore: Firestore,
      private auth: AuthService,
      private functions: Functions,
  ) { }

  public GetAllClientData(): Observable<Customer[]> {
    const clientRef = collection(this.firestore, 'Clients');
    const q1 = query(clientRef, where('IsActive', '==', true));
    return collectionData(q1, {idField: 'ID'}) as Observable<Customer[]>;
  }

  public GetOldClientData(): Observable<Customer[]> {
    const clientRef = collection(this.firestore, 'Clients');
    const q1 = query(clientRef, where('IsActive', '==', true), where('IsSettled', '==', true));
    return collectionData(q1, {idField: 'ID'}) as Observable<Customer[]>;
  }

  public GetCurrentClientData(): Observable<Customer[]> {
    const clientRef = collection(this.firestore, 'Clients') as CollectionReference<Customer>;
    const q1 = query<Customer>(clientRef, where('IsActive', '==', true), where('IsSettled', '==', false));
    return collectionData<Customer>(q1, {idField: 'ID'}).pipe(
        concatMap(async (clientList: Customer[]): Promise<Customer[]> => {
          for (const client of clientList) {
            const _ledger: Ledger[] = await firstValueFrom(this.GetLastLedgerRecord(client.ID as string));
            if (!_ledger.length) {
              throw new Error('No ledger found');
            }
            const _lastLedger = _ledger[0];
            client.Arrears = _lastLedger.Arrears;
            client.Balance = _lastLedger.Balance;
          }
          return clientList;
        })
    );
  }

  public GetAClient(id: string) {
    const clientRef = doc(this.firestore, `Clients/${id}`);
    return docData(clientRef, {idField: 'ID'});
  }

  public GetLastLedgerRecord(id: string): Observable<Ledger[]> {
    const ledgerRef = collection(this.firestore, `Clients/${id}/Ledger`);
    const q1 = query(
        ledgerRef,
        where('Date', '<=', new Date()),
        orderBy('Date', 'desc'),
        limit(1),
    );
    return collectionData(q1, {idField: 'ID'}) as Observable<Ledger[]>;
  }

  public GetLedger(id: string): Observable<Ledger[]> {
    const ledgerRef = collection(this.firestore, `Clients/${id}/Ledger`);
    const q1 = query(ledgerRef, where('Date', '<=', new Date()), orderBy('Date', 'desc'));
    return collectionData(q1, {idField: 'ID'}) as Observable<Ledger[]>;
  }

  public GetLedgerDebug(id: string): Observable<Ledger[]> {
    const ledgerRef = collection(this.firestore, `Clients/${id}/Ledger`);
    const q1 = query(ledgerRef, orderBy('Date', 'desc'));
    return collectionData(q1, {idField: 'ID'}) as Observable<Ledger[]>;
  }

  public async IsClientExists(id: string): Promise<boolean> {
    const client = await firstValueFrom(this.GetAClient(id));
    return !!client;
  }

  public async CreateClient(client: Customer): Promise<FnResponse> {
    const id = client.ID;
    client.Balance = client.TotalReceivableBalance;
    client.Arrears = 0;
    client.Installment = 0;
    const _client: any = client;
    delete _client.ID;
    const clientRef = doc(this.firestore, `Clients/${id}`);
    return setDoc(clientRef, _client).then(() => {
      console.log('User created successfully.');
      return {
        status: true,
        message: 'User created successfully.',
        data: null,
      };
    }).catch((err) => {
      console.log('Error creating client: ', err);
      return {
        status: false,
        message: err.message as string,
        data: err,
      };
    });
  }

  public async UpdateClient(client: Customer): Promise<FnResponse> {
    const id = client.ID;
    const _client: any = client;
    delete _client.ID;
    const clientRef = doc(this.firestore, `Clients/${id}`) as DocumentReference<Customer>;
    return updateDoc<Customer>(clientRef, _client).then(() => {
      console.log('User created successfully.');
      return {
        status: true,
        message: 'User created successfully.',
        data: null,
      };
    }).catch((error: any) => {
      console.log('Error creating user: ', error);
      return {
        status: false,
        message: error.message,
        data: error,
      };
    });
  }

  public async MakePayment(client: Customer, date: string, amount: number, refNo: number = 0, particulars: string = "Paid by Cash", remarks: string = ""): Promise<FnResponse> {
    const _makePayment = httpsCallable<{ date: string, amount: number, referenceNo: number, particulars: string, remarks: string, clientID: string }, FnResponse>(this.functions, 'makePayment');
    const res = await _makePayment({
      date,
      amount,
      remarks,
      particulars,
      referenceNo: refNo,
      clientID: client.ID as string
    });
    return res.data;
  }

  // public async GetLastLedgerRecord(clientId: string): Promise<Ledger> {
  //   const docs = await firstValueFrom(this.GetLedger(clientId)) as Ledger[] | undefined;
  //   if (docs == undefined || docs.length == 0) {
  //     throw Error("User Not created successfully.");
  //   }
  //
  //   let installmentNo = 0
  //   let lastRecord: Ledger = docs[0];
  //
  //   for(let i = 0; i < docs.length; i++) {
  //     if (docs[i].InstallmentNo != null && docs[i].InstallmentNo > installmentNo) {
  //       installmentNo = docs[i].InstallmentNo;
  //     }
  //   }
  //   lastRecord.InstallmentNo = installmentNo;
  //   return lastRecord;
  // }

  public async GetSettlementBalance(clientId: string): Promise<{payableBalance: number, reducibleInterest: number}> {
    let client = await firstValueFrom(this.GetAClient(clientId)) as Customer | undefined;
    if (client == undefined) {
      throw Error("User Not created successfully.");
    }

    let ledger = await firstValueFrom(this.GetLastLedgerRecord(clientId)) as Ledger[] | undefined;
    if (ledger == undefined || ledger.length == 0) {
      throw Error("User Not created successfully.");
    }
    const lastLedgerRecord = ledger[0];
    let installmentNo = 0;
    for(let ledgerRecord of ledger) {
      if(ledgerRecord.InstallmentNo != null && ledgerRecord.InstallmentNo > installmentNo) {
        installmentNo = ledgerRecord.InstallmentNo;
      }
    }

    let payableBalance: number = lastLedgerRecord.Balance, reducibleInterest = 0;
    if (client.MonthCount > installmentNo!) {
      const interestPerMonth = client.IntPlusEPSaleValue / client.MonthCount;
      reducibleInterest = interestPerMonth * (client.MonthCount - installmentNo);
      payableBalance = lastLedgerRecord.Balance - reducibleInterest;
    }
    return {payableBalance, reducibleInterest};
  }

  public async Settlement(clientId: string, refNo: number, particulars: string = "Settle", remarks: string = "", date: Date): Promise<FnResponse> {
    let {payableBalance, reducibleInterest} = await this.GetSettlementBalance(clientId);

    let client = await firstValueFrom(this.GetAClient(clientId)) as Customer | undefined;

    if (client == undefined) {
      throw Error("User Not created successfully.");
    }

    const settlement = httpsCallable<{
      clientID: string,
      amount: number,
      reducibleInterest: number,
      particulars: string,
      remarks: string,
      refNo: number,
      date: string,
    }, FnResponse>(this.functions, 'settlement');

    const res = await settlement({
      clientID: clientId,
      amount: payableBalance,
      reducibleInterest,
      particulars: particulars,
      remarks: remarks,
      refNo: refNo || 0,
      date: date.toISOString(),
    });
    return res.data;
  }

  public async ChangeInstallmentData(client: Customer): Promise<object> {
    const ledgerRef = collection(this.firestore, `Clients/${client.ID}/Ledger`);
    const q1 = query(
        ledgerRef,
        where('Date', '<=', new Date()),
        orderBy('Date', 'desc'),
    );
    const ledger = await firstValueFrom(collectionData(q1, {idField: 'ID'}) as Observable<Ledger[]>);

    if (ledger == undefined) {
      throw Error("User Not created successfully.");
    }

    let installmentNo = 0;
    for (let i = 0; i < ledger.length; i++) {
      if (ledger[i].InstallmentNo != null && ledger[i].InstallmentNo > installmentNo) {
        installmentNo = ledger[i].InstallmentNo;
      }
    }

    const lastBalance = ledger[0].Balance;
    const lastArrears = ledger[0].Arrears;
    const currentPaid = client.TotalReceivableBalance - lastBalance;

    return {installmentNo, lastBalance, lastArrears, currentPaid};
  }

  public async ChangeInstallment(
      clientId: string,
      monthCount: number,
      monthRental: number,
      date: Date,
      intPlusEPSaleValue: number | null = null,
      totalReceivableBalance: number | null = null,
      particulars: string = "Installment Change",
      remarks: string = "",
  ): Promise<FnResponse> {
    let client = await firstValueFrom(this.GetAClient(clientId)) as Customer | undefined;

    if (client == undefined) {
      throw Error("User Not created successfully.");
    }

    const changeInstallment = httpsCallable<{
      clientID: string,
      monthCount: number,
      monthRental: number,
      intPlusEpSaleValue: number | null,
      totalReceivableBalance: number | null,
      particulars: string,
      remarks: string,
      date: string
    }, FnResponse>(this.functions, 'changeInstallment');

    const res = await changeInstallment({
      clientID: clientId,
      monthCount: monthCount,
      monthRental: monthRental,
      intPlusEpSaleValue: intPlusEPSaleValue,
      totalReceivableBalance: totalReceivableBalance,
      particulars: particulars,
      remarks: remarks,
      date: date.toISOString(),
    });
    return res.data;
  }

  public async CreateTestRental(clientID: string) {
    const createRental = httpsCallable<{ clientID: string }, FnResponse>(this.functions, 'testCreateRental');
    const res = await createRental({clientID});
    return res.data;
  }

  public async DeleteClient(clientID: string) {
    const deleteClient = httpsCallable<{ clientID: string }, FnResponse>(this.functions, 'deleteClient');
    const res = await deleteClient({clientID});
    return res.data;
  }
}
