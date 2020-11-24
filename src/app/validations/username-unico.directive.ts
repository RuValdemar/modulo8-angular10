import { Directive, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { WebAPIService } from '../services/web-api.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appUsernameUnico]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UsernameUnicoDirective, multi: true}]
})
export class UsernameUnicoDirective implements AsyncValidator{

  constructor(
    private webApiService: WebAPIService
  ) { }
  validate(
    control: import('@angular/forms'
    ).AbstractControl)
    : Promise<import('@angular/forms').ValidationErrors> | import('rxjs').Observable<import('@angular/forms').ValidationErrors> {
      const username = control.value;
      return this.webApiService.obtenerUsernames().pipe(
      map(usernameArr => {
        if (usernameArr.indexOf(username) !== -1){
          return {usernameUnico: true};
        }
        return null;
      })
    );
  }
}

@Injectable({providedIn: 'root'})
export class UsernameUnicoService implements AsyncValidator {
  constructor(private webApiService: WebAPIService){}

  validate(
    control: import('@angular/forms').AbstractControl
    ): Promise<import('@angular/forms').ValidationErrors> | import('rxjs').Observable<import('@angular/forms').ValidationErrors>
 {
    const usernameUnicoDirective = new UsernameUnicoDirective(this.webApiService);
    return usernameUnicoDirective.validate(control);
 }
}
