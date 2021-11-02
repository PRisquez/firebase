import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  employee: Employee = null;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private _router: Router) { 
    const navigation = _router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.employee === 'undefined'){
      this._router.navigate(['list']);
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.employee;
    this._router.navigate(['edit'], this.navigationExtras);
  }

  onGoBackToList(): void {
    this._router.navigate(['list']);
  }

  onDelete(): void {
    alert('Delete');
  }
}
