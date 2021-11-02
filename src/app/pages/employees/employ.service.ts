import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/shared/models/employee.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmployService {
  employees: Observable<Employee[]>;

  private employeesCollection: AngularFirestoreCollection<Employee>;

  constructor(private readonly _afs: AngularFirestore) { 
    this.employeesCollection = _afs.collection<Employee>('employees');
    this.getEmployees();
  }

  onDeleteEmployee(empId: string): Promise<void> {
    return new Promise ( async (resolve, reject) => {
      try {
        const result = this.employeesCollection.doc(empId).delete();
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }
  onSaveEmployee(employee: Employee, empId: string): Promise<void> {
    return new Promise (async (resolve, reject) => {
      try {
        const id = empId || this._afs.createId();
        const data = {id, ...employee};
        const result = this.employeesCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  private getEmployees(): void {
    this.employees = this.employeesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Employee))
    )
  }
}
