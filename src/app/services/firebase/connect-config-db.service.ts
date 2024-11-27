import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Injectable } from '@angular/core';
import {ConnectDb} from '../../models/firebase/ConnectDb';

@Injectable({
  providedIn: 'root'
})
export class ConnectConfigDbService {

  private db: ConnectDb;

  constructor() {
    this.db = {
      apiKey: "AIzaSyA05N18UVLNZF16TO9t-vVRTDObb5fj47E",
        authDomain: "empleadosucad.firebaseapp.com",
      databaseURL: "https://empleadosucad-default-rtdb.firebaseio.com",
      projectId: "empleadosucad",
      storageBucket: "empleadosucad.firebasestorage.app",
      messagingSenderId: "941499510599",
      appId: "1:941499510599:web:d4e6ff2d60d8d4dd546662",
      measurementId: "G-90LVLQKSSM"
    };
  }

  initDb(){
    return initializeApp(this.db);
  }

  analiticsDb(){
    return getAnalytics(this.initDb());
  }

  getDb(): ConnectDb{
    return this.db;
  }

  setDb(db: ConnectDb){
    this.db = db;
  }
}
