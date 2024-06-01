import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {


  total_carrito : any;

  productos : any;

  constructor() { }

  ngOnInit() {
    // Obtener datos del localStorage y asignar a productos
    const localStorageData = localStorage.getItem('carrito');
    this.productos = localStorageData ? JSON.parse(localStorageData) : [];

    // Actualizar el total_carrito
    this.actualizarTotalCarrito();
  }

  eliminar_producto(idExistencia: any) {
    // Filtrar los productos para excluir el que se desea eliminar
    this.productos = this.productos.filter((producto: any) => producto.id_existencia !== idExistencia);

    // Actualizar el localStorage con la nueva lista de productos
    localStorage.setItem('carrito', JSON.stringify(this.productos));

    // Actualizar el total_carrito
    this.actualizarTotalCarrito();
  }

  private actualizarTotalCarrito() {
    this.total_carrito = this.productos.reduce((total: number, producto: any) => total + parseInt(producto.cantidad), 0);
  }


}
