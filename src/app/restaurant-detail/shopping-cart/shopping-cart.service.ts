import { Injectable } from '@angular/core'

import { CarItem } from './cart.item.model'
import { MenuItem } from '../menu-item/menu-item.model'
import { NotificationService } from '../../shared/messages/notification.service'


@Injectable()
export class ShoppingCartService{
	
	items: CarItem[] = []

	constructor(private notificationService: NotificationService) {

	}

	clear() {
		this.items = [];
	}

 	addItem(item: MenuItem) {
 		let foundItem = this.items.find((mItem)=> mItem.menuItem.id === item.id)
 		if (foundItem) {
 			this.increaseQty(foundItem)

 		} else {
 			this.items.push(new CarItem(item))
 		}

 		this.notificationService.notify(`Voçê adicionou um item ${item.name}`)
 	}

		
	removeItem(item: CarItem) {
		this.items.splice(this.items.indexOf(item),1)

		this.notificationService.notify(`Voçê removeu um item ${item.menuItem.name}`)
 	}

 	increaseQty(item: CarItem) {
  		item.quantity = item.quantity + 1
  	}

  	decreaseQty(item: CarItem) {
  		item.quantity = item.quantity - 1

  		if (item.quantity ===0) {
  			this.removeItem(item)
  		}
  	}

	total(): number {

		return	this.items
			.map(item=> item.value())
			.reduce((prev,value)=> prev+value,0)
	}
}
