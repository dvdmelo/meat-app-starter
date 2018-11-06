import {HttpErrorResponse} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'

import 'rxjs/add/observable/throw'

export class ErrorHandler {
	static handleError(error: HttpErrorResponse | any) {

		let erroMessage: string

		if (error instanceof HttpErrorResponse) {
			const body = error.error
			erroMessage = `Erro ${error.url}: ${error.status} - ${error.statusText} || ''} ${body}`
		} else {
			erroMessage =  error.message ? error.message: error.toString()
		}

		console.log(erroMessage)

		return Observable.throw(erroMessage)
		

	}
}