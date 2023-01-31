import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Articulos } from 'src/app/interfaces/interface';
import { ArticulosServiceService } from 'src/app/services/articulos-service.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-datostabla',
  templateUrl: './datostabla.component.html',
  styleUrls: ['./datostabla.component.css']
})
export class DatostablaComponent implements OnInit{

  //Mi VARIABLE articulo TIENE LOS DATOS DE MI BD.
  articulo!:Articulos[];

  constructor(private dialog:MatDialog,
    private actiService:ArticulosServiceService){ }

  //OBTENGO LOS DATOS MI BASE DE DATOS Y LO GUARDO EN MI VARIABLE articulo.
  ngOnInit(): void {
    this.actiService.getArticulo().subscribe( Articulo => {
      this.articulo = Articulo;
    })
  }

  //LLAMO A MI COMPONENTE QUE TIENE MI DIALOG PARA AGREGAR UN NUEVO ARTICULO.
  agregarArticulo() {
    this.dialog.open(DialogComponent, {
      data: {}
    });
  }

  //ELIMINAR EL doc DE ESTA BASE DE DATOS CON EL id.
  onClickDelete(articulo:Articulos){

    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        //LOS DATOS SE ELIMINARAN SOLO SI DA EN SI
        const response = this.actiService.deleteArticulo(articulo)
        console.log(response);

        Swal.fire(
          'Eliminado!',
          'Su archivo ha sido eliminado.',
          'success'
        )
      }
    })
  }

}
