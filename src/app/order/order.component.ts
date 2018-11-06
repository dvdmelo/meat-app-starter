import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router } from '@angular/router'


import { RadioOption } from '../shared/radio/radio-option.model'

import { OrderService } from './order.service'
import { CarItem } from '../restaurant-detail/shopping-cart/cart.item.model'

import  { Order,OrderItem } from './order.model'



@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
    
    emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    numberPattern = /^[0-9]*$/


    orderForm: FormGroup


    delivery: number = 8

   paymentOptions: RadioOption[] = [
   	{label: 'Dinheiro', value: 'MON'},
   	{label: 'Cartão de Débito', value: 'DEB'},
   	{label: 'Cartão de Refeição', value: 'REF'}
   ]

  constructor(private orderService: OrderService, 
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group ({
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        email: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern) ]),
        emailConfirmation: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
        address: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
        number: this.formBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
        optionalAddress: this.formBuilder.control(''),
        paymentOption: this.formBuilder.control('',[Validators.required]),
    },{validator:OrderComponent.equalstTo })
  }

   static equalstTo(group: AbstractControl): {[key:string]: boolean}{
     const email= group.get('email')
     const emailConfirmation = group.get('emailConfirmation')

     if (!email || !emailConfirmation ) {
       return undefined
     }

     if(email.value !== emailConfirmation.value) {
       return  {emailNotMatch: true}
     }

     return undefined

   }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CarItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item:  CarItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item:  CarItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CarItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){

    order.orderItems = this.cartItems()
      .map((item: CarItem)=> new OrderItem(item.quantity,item.menuItem.id))

      this.orderService.checkOrder(order)
          .subscribe( (orderId: string)=> {
            this.router.navigate(['/order-summary'])            
            this.orderService.clear()
          })

      console.log(order)
  }

}
