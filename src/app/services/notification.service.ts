import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, limit, query, updateDoc, where } from "@angular/fire/firestore";
import { firstValueFrom, Observable } from "rxjs";
import { Notification, FnResponse } from "../types";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { CollectionReference } from "@firebase/firestore";
import { PDFDocument, StandardFonts } from 'pdf-lib';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
      private firestore: Firestore,
      private functions: Functions,
  ) {}


  public GetAlerts(): Observable<Notification[]> {
    const alertRef = collection(this.firestore, 'Alerts');

    const today = new Date();
    const expireDate = new Date(new Date().setDate(today.getDate() - 30));

    const q1 = query(alertRef, where('IsActive', '==', true), where('Date', '>=', expireDate) );
    return collectionData(q1, { idField: 'ID' }) as Observable<Notification[]>;
  }

  public async IsAlertsAvailable(): Promise<boolean> {
    const alertRef = collection(this.firestore, 'Alerts') as CollectionReference<Notification>;

    const today = new Date();
    const expireDate = new Date(new Date().setDate(today.getDate() - 30));

    const q1 = query(alertRef, where('IsActive', '==', true), where('Date', '>=', expireDate), limit(1));
    const data = await firstValueFrom(collectionData(q1, { idField: 'ID' }));
    return data.length > 0;
  }

  public ChangeMartAs(alertID: string, status: boolean): Promise<FnResponse> {
    const alertRef = doc(this.firestore, `Alerts/${alertID}`);
    return updateDoc(alertRef, { Seen: status }).then(() => {
      console.log('Notification updated successfully.');
      return {
        status: true,
        message: 'Notification updated successfully.',
        data: null,
      };
    }).catch((error: any) => {
      console.log('Error updating notification: ', error);
      return {
        status: false,
        message: error.message,
        data: error,
      };
    });
  }

  public DeleteAlert(alertID: string): Promise<FnResponse> {
    const alertRef = doc(this.firestore, `Alerts/${alertID}`);
    return updateDoc(alertRef, { IsActive: false }).then(() => {
      console.log('Notification deleted successfully.');
      return {
        status: true,
        message: 'Notification deleted successfully.',
        data: null,
      };
    }).catch((error: any) => {
      console.log('Error deleting notification: ', error);
      return {
        status: false,
        message: error.message,
        data: error,
      };
    });
  }

  public async CreateTestAlert(clientID: string, note: string) {
    const createAlert = httpsCallable<{clientID: string, note: string}, FnResponse>(this.functions, 'testCreateAlert');
    const res = await createAlert({ clientID, note });
    return res.data;
  }

  public async SendFirstLetter(notification: Notification, address: string){
    const url = '/assets/1st_Letter.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const arrearsDate = moment().format('YYYY.MM.DD');
    const today = moment().format('YY.MM.DD');
    const bondNumber = notification.Data.Client.BondNo;
    const arrears = notification.Data.Client.Arrears.toString();
    const filename = notification.Data.Client.Name + ' ' + 'First Letter';
    const addressLines: string[] = address.split('\n');
    const lineGapY = 20;
    let lineNumber = 0;
    addressLines.forEach(line => {
      const positionY = height - 300 + (lineNumber * lineGapY);
      firstPage.drawText(line, { x: 75, y: positionY, size: 12, font: helveticaFont });
    });

    firstPage.drawText(arrearsDate, { x: 400, y: height - 365, size: 12, font: helveticaFont });
    firstPage.drawText(today, { x: 75, y: height - 225, size: 12, font: helveticaFont });
    firstPage.drawText(bondNumber, { x: 150, y: height - 323, size: 12, font: helveticaFont });
    firstPage.drawText(arrears, { x: 150, y: height - 389, size: 12, font: helveticaFont });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {type: "application/pdf"});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  public async SendSecondLetter(notification: Notification, address: string){
    const url = '/assets/2nd_Letter.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const arrearsDate = moment().format('YYYY.MM.DD');
    const today = moment().format('YY.MM.DD');
    const bondNumber = notification.Data.Client.BondNo;
    const arrears = notification.Data.Client.Arrears.toString();
    const filename = notification.Data.Client.Name + ' ' + 'Second Letter';
    const addressLines: string[] = address.split('\n');
    const lineGapY = 20;
    let lineNumber = 0;
    addressLines.forEach(line => {
      const positionY = height - 300 + (lineNumber * lineGapY);
      firstPage.drawText(line, { x: 75, y: positionY, size: 12, font: helveticaFont });
    });

    firstPage.drawText(arrearsDate, { x: 185, y: height - 310, size: 12, font: helveticaFont });
    firstPage.drawText(today, { x: 75, y: height - 190, size: 12, font: helveticaFont });
    firstPage.drawText(bondNumber, { x: 150, y: height - 252, size: 12, font: helveticaFont });
    firstPage.drawText(arrears, { x: 350, y: height - 372, size: 12, font: helveticaFont });
    firstPage.drawText('60', { x: 350, y: height - 352, size: 12, font: helveticaFont });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {type: "application/pdf"});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
  public async SendLastLetter(notification: Notification, isThird = true, address: string){
    const url = '/assets/3rd_Letter.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const arrearsDate = moment().format('YYYY.MM.DD');
    const today = moment().format('YY.MM.DD');
    const bondNumber = notification.Data.Client.BondNo;
    const arrears = notification.Data.Client.Arrears.toString();
    const filename = notification.Data.Client.Name + ' ' + 'Last Letter';

    const addressLinesTemp: string[] = address.split('\n');
    const lastLine: string = addressLinesTemp.slice(2, addressLinesTemp.length).join(',');
    const addressLines: string[] = addressLinesTemp.slice(0, 2);
    addressLines.push(lastLine);

    const lineGapY = 20;
    let lineNumber = 0;

    addressLines.forEach(line => {
      const positionY = height - 125 - (lineNumber * lineGapY);
      firstPage.drawText(line, { x: 45, y: positionY, size: 12, font: helveticaFont });
      lineNumber++;
    });

    firstPage.drawText(arrearsDate, { x: 50, y: height - 365, size: 12, font: helveticaFont });
    firstPage.drawText(today, { x: 60, y: height - 190, size: 12, font: helveticaFont });
    firstPage.drawText(bondNumber, { x: 150, y: height - 233, size: 12, font: helveticaFont });
    firstPage.drawText(arrears, { x: 325, y: height - 410, size: 12, font: helveticaFont });
    if (isThird) {
      firstPage.drawText('90', { x: 325, y: height - 392, size: 12, font: helveticaFont });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {type: "application/pdf"});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}
