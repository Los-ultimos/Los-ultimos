import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atencion } from 'src/app/models/atencion.model';
import { AtencionService } from 'src/app/services/atencion.service';

@Component({
  selector: 'app-register-atencion',
  templateUrl: './register-atencion.component.html',
  styleUrls: ['./register-atencion.component.css']
})
export class RegisterAtencionComponent implements OnInit {

  constructor(private atencionService:AtencionService) { }

  ngOnInit(): void {
  }

  async addAtencion(form:NgForm){
    let atencion:Atencion={
      symp:form.value.symp,
      freqc:form.value.freqc,
      temp:form.value.temp,
      capilar:form.value.capilar,
      mucosas:form.value.mucosas,
      hidra:form.value.hidra,
      resp:form.value.resp,
      pulse:form.value.pulse,
      state:form.value.state,
      appetite:form.value.appetite,
      prono:form.value.prono,
      treat:form.value.treat,
      labs:form.value.labs,
      fechaAtencion:form.value.fechaAtencion,
      estadoat:form.value.estadoat,
      vet:form.value.vet,
      registro:form.value.registro,
      entrada: form.value.entrada,
      salida:form.value.salida,
    }

    this.atencionService.saveAtencion(atencion)
  }

}
