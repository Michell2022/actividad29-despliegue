import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Articulos } from 'src/app/interfaces/interface';
import { ArticulosServiceService } from 'src/app/services/articulos-service.service';
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
    const response = this.actiService.deleteArticulo(articulo)
    console.log(response);
  }

}
