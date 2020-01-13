import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-validation',
  templateUrl: './delete-account-approve.component.html',
  styleUrls: ['./delete-account-approve.component.scss']
})
export class DeleteAccountApproveComponent implements OnInit {

  constructor( private storage : StorageService, private router : Router, private location : Location ) {
  }

  ngOnInit() {
  }

  async deleteAccount() {
    await this.storage.removeAccount();
    await this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }

}
