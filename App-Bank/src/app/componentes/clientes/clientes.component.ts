import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    valor: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteServicio) {}

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe(
      clientes=> {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldototal: number = 0 ;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        saldototal+= cliente.valor;
      })
    }
    return saldototal;
  }

  agregar({ value, valid }: { value: Cliente, valid: boolean }) {
    if (!valid) {
      window.alert("encuesta invalida")
    }
    else{
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }


}
