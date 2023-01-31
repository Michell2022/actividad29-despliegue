import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticulosServiceService } from 'src/app/services/articulos-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  articleForm!:FormGroup;

    // INYECTO MI SERVICIO Y EL MATDIALOG.
    constructor(private fb:FormBuilder,
      private dialogRef: MatDialogRef<DialogComponent>,
      private artiService:ArticulosServiceService,
      @Inject(MAT_DIALOG_DATA) public data: any) {

      // MEDIANTE MI VARIABLE articleForm OBTENGO LOS VALORES DE MI FORMULARIO.
      this.articleForm = new FormGroup({
        codigo: new FormControl(),
        descripcion: new FormControl(),
        precio: new FormControl()
      })
    }

    // HAGO MIS VALIDACIONES PARA LOS INPUT.
    ngOnInit(): void {
      this.articleForm = this.fb.group({
        codigo: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        precio: ['', [Validators.required]]
      })
    }

  // AGREGO UN NUEVO ARTICULO A MI BASE DE DATOS.
  onSubmit(){
    const response = this.artiService.addArticulo(this.articleForm.value)
    console.log(response)
    this.dialogRef.close();
  }


  //CIERRO EL DIALOG.
  cancelar(){
    this.dialogRef.close();
  }

}
