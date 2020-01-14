import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Location} from '@angular/common';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  amountFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}
