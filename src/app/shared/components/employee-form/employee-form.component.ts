import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployService } from 'src/app/pages/employees/employ.service';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = null;

  employeeForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;

  constructor(private _router: Router, private _fb: FormBuilder, private _employeesService: EmployService) { 
    const navigation = this._router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.employee === 'undefined') {
      this._router.navigate(['new']);
    }else{
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSave(): void {
    console.log('Saved',  this.employeeForm.value);
    if(this.employeeForm.valid){
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || null;
      this._employeesService.onSaveEmployee(employee, employeeId);
      this.employeeForm.reset();
    }
  }

  onGoBackToList(): void {
    this._router.navigate(['list']);
  }

  private initForm(): void {
    this.employeeForm = this._fb.group({
      name : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.pattern(this.isEmail),Validators.email]],
      startDate : ['', [Validators.required]],
    });
  }
}
