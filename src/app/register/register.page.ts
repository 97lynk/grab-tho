import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  email = '';
  
  username = '';

  password = '';

  confirmPassword = '';

  noMatchPassword = false;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
