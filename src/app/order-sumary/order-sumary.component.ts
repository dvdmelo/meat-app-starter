import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order-sumary',
  templateUrl: './order-sumary.component.html'
})
export class OrderSumaryComponent implements OnInit {

  constructor() { }

  rated: boolean

  ngOnInit() {
  }

  rate(){
  	this.rated =true;
  }
}
