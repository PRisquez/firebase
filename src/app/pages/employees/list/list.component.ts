import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployService } from '../employ.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  employees$ = this._employeesService.employees;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };


  constructor(private _router: Router, private _employeesService: EmployService) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: any): void {
    this.navigationExtras.state.value = item;
    this._router.navigate(['edit'], this.navigationExtras);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this._router.navigate(['details'], this.navigationExtras);
  }

  onGoToDelete(item: any): void {
    alert('Deleted');
  }

}
