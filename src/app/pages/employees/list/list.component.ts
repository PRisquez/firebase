import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  fakeData = [
    {
      name: 'Jose',
      lastName: 'Pérez',
      email: 'mperez@gmail.com',
      startDate: '01/02/2021'
    },
    {
      name: 'María',
      lastName: 'Pérez',
      email: 'mperez@gmail.com',
      startDate: '01/02/2021'
    },
    {
      name: 'Manuel',
      lastName: 'Pérez',
      email: 'mperez@gmail.com',
      startDate: '01/02/2021'
    },
    {
      name: 'Pedro',
      lastName: 'Pérez',
      email: 'mperez@gmail.com',
      startDate: '01/02/2021'
    }
  ]

  constructor(private _router: Router) { }

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
