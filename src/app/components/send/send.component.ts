import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedDataService} from '../../services/shared-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  sendForm: FormGroup;

  constructor(private location: Location,
              private fb: FormBuilder,
              public shared: SharedDataService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.sendForm = this.fb.group({
      address: ['', Validators.required],
      amount: [null, {validators: [Validators.required]}],
    });
  }

  get address() {
    return this.sendForm.controls.address;
  }
  get amount() {
    return this.sendForm.controls.amount;
  }

  back() {
    this.location.back();
  }

  send() {
    this.shared.addressTo = this.address.value;
    this.shared.sum = this.amount.value;
    this.router.navigate(['/confirm']);
  }
}
