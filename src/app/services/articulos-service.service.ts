import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Articulos } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ArticulosServiceService {

  constructor(private firestore: Firestore) { }

  //SE AGREGA UN NUEVO ARTICULO - ES LLAMADO POR MI dialog.component.ts
  addArticulo(producto: Articulos) {
    const articuloRef = collection(this.firestore, 'articulos');
    return addDoc(articuloRef, producto);
  }


    //OBTENER UN SOLO PRODUCTO.
    getArticulo():Observable<Articulos[]>{
      //EN articuloRef TRAERE TODA LA COLECCION DE MI BASE DE DATOS DE articulos.
      const articuloRef = collection(this.firestore, 'articulos');
      //TRAIGO LA collectionData DE LA referenciaRef Y LAS ORDENO POR EL CAMPO id POR MEDIO DE UN ARREGLO.
      return collectionData(articuloRef, {idField:'id'}) as Observable<Articulos[]>
    }

  //ELIMINAR EL doc DE ESTA BASE DE DATOS CON EL id.
  deleteArticulo(articulo: Articulos) {
    const articuloRef = doc(this.firestore, `articulos/${articulo.id}`)
    return deleteDoc(articuloRef);
  }

}
