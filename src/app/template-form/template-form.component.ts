import { Component, OnInit } from '@angular/core';
import { Registro } from '../models/registro';
import { Suscripcion } from '../models/suscripcion.enum';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  suscripciones: any[] = [];
  model: Registro = {username: '', password: '', suscripcion: Suscripcion.Gratuita, promociones: true};

  constructor() { }

  ngOnInit(): void {
    for (const item in Suscripcion) {
      if (isNaN(Number(item))) {
        this.suscripciones.push({text: item, value: Suscripcion[item]});
      }
    }
  }

  submit(): void {
    console.log(this.model);
  }
  refrescar(): void {
    this.model = {
      username: '',
      password: '',
      suscripcion: Suscripcion.Gratuita,
      promociones: true
    };
  }

}
