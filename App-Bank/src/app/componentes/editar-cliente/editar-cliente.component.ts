import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    valor: 0
  }

  id:string;

  constructor(private clientesServicio: ClienteServicio,
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit() {

      this.id= this.route.snapshot.params['id'];
      this.clientesServicio.getCliente(this.id).subscribe(cliente=>{
        this.cliente = cliente;

      })

    }


    guardar({value,valid}:{value:Cliente,valid:boolean}){
      if(!value){
        console.log("hay un error en editar"); }
      else{
        value.id = this.id;
        this.clientesServicio.modificarCliente(value);
        this.router.navigate(['/']);
      }
    }

    eliminar(){
      if(confirm("Eliminar cliente?")){
        this.clientesServicio.eliminarCliente(this.cliente);
        this.router.navigate(['/']);
      }
    }




}
