import { Injectable } from '@angular/core'

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service'

import { CarItem }  from '../restaurant-detail/shopping-cart/cart.item.model'
import  { Order, OrderItem } from './order.model'

import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'

import { MEAT_API } from '../app.api'

@Injectable()
export class OrderService {

	constructor(private cartService: ShoppingCartService, private http: HttpClient){}

 
  cartItems(): CarItem[]{
  	return this.cartService.items
  }
 
   itemsValue(): number {
     return this.cartService.total()
   }

  increaseQty(item: CarItem) {
  	this.cartService.increaseQty(item)
  }

  decreaseQty(item: CarItem) {
  	this.cartService.decreaseQty(item)
  }
	
 remove(item: CarItem) {
  	this.cartService.removeItem(item)
  }

  clear() {
    this.cartService.clear()
  }

  checkOrder(order: Order): Observable<string> { 
    const headers= new Headers()

    headers.append('Content-Type', 'application/json')

    return  this.http.post<Order>(`${MEAT_API}/orders`,order)                                                          
                             .map(order => order.id)

  }
}
