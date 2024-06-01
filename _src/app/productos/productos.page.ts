import { Component, Injector, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {


  carrito: any[] | null = [];

  productos: any;
  nombre : any;
  categoria : any;
  talla : any;
  color : any;

  cantidad_carrito : any;
  talla_carrito : any;
  color_carrito : any;
  sucursal_carrito : any;
  id_producto_carrito : any;
  nombre_producto_carrito : any;
  id_existencia : any;

  total_carrito : any;

  titulos: any[] = [];

  productos_iniciales : any;

  constructor(private injector: Injector, private activatedRoute: ActivatedRoute, private alertController: AlertController, private router: Router) {

    this.activatedRoute.queryParams.subscribe(params => {
      var page = this.activatedRoute.snapshot.paramMap.get('page');
      var nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
      var categoria = this.activatedRoute.snapshot.paramMap.get('categoria');
      var talla = this.activatedRoute.snapshot.paramMap.get('talla');
      var color = this.activatedRoute.snapshot.paramMap.get('color');
      console.log(page);

      if(nombre == null || nombre == '-'){
        this.nombre = '';
      }

      if(categoria == null){
        this.categoria = '-';
      }else{
        this.categoria = categoria;
      }

      if(talla == null || talla == '-'){
        this.talla = '';
      }

      if(color == null || color == '-'){
        this.color = '';
      }

      // Se no se tienen parametros se puede llanar directamente al servicio sin la suscripcion de la ruta

      const productosService = this.injector.get(ProductosService)

      this.productos = productosService.getProductos(page, nombre, categoria, talla, color);


      $('.titulo_sucursal').each(function(index, element){
        if(index != 0){
          $(element).css('display', 'none');
        }else{
          $(element).css('border', '1px solid red');
        }
      })

    });


  }

  buscar_productos() {

    if( this.nombre != '' ){
      this.nombre = this.nombre;
    }else{
      this.nombre = '-';
    }

    if( this.categoria != '-' ){
      this.categoria = this.categoria;
    }

    if( this.talla != '' ){
      this.talla = this.talla;
    }else{
      this.talla = '-';
    }

    if( this.color != '' ){
      this.color = this.color;
    }else{
      this.color = '-';
    }

    // alert('/productos/1/'+this.nombre+'/'+'/'+this.categoria+'/'+this.talla+'/'+this.color);

    this.router.navigate(['/productos/1/'+this.nombre+'/'+this.categoria+'/'+this.talla+'/'+this.color]);

    if(this.nombre == '-'){
      this.nombre = '';
    }
    if(this.color == '-'){
      this.color = '';
    }
    if(this.talla == '-'){
      this.talla = '';
    }

  }


  ngOnInit() {
    const self = this;

    // Usar una bandera para evitar múltiples clics
    let btnAgregarHabilitado = true;

    $('body').off('click', '.btn-agregar').on('click', '.btn-agregar', function(event) {
      event.preventDefault();

      if (btnAgregarHabilitado) {
        btnAgregarHabilitado = false;

        // Obtener los valores
        const cantidad_carrito = $(this).closest('ion-row').find('.cantidad').val();
        const talla_carrito = $(this).closest('ion-row').find('.talla_nombre').text();
        const color_carrito = $(this).closest('ion-row').find('.color_nombre').text();
        const id_producto_carrito = $(this).closest('ion-row').find('.id_producto').text();
        const nombre_producto_carrito = $(this).closest('ion-row').find('.nombre_producto').text();
        const id_existencia_carrito = $(this).closest('ion-row').find('.id_existencia').text();
        const sucursal_carrito = $(this).closest('ion-row').find('.sucursal_nombre').text();

        // Crear un objeto con los valores
        const producto = {
          cantidad: cantidad_carrito,
          talla: talla_carrito,
          color: color_carrito,
          id_producto: id_producto_carrito,
          nombre_producto: nombre_producto_carrito,
          id_existencia: id_existencia_carrito,
          sucursal: sucursal_carrito
        };

        // Recuperar el array actual del localStorage o crear uno vacío si no existe
        const carritoString = localStorage.getItem('carrito');
        const carrito = carritoString ? JSON.parse(carritoString) : [];

        // Agregar el nuevo producto al array
        carrito.push(producto);

        // Almacenar el array actualizado en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar el array del componente
        self.carrito = carrito;

        console.log(carrito);

        // Calcular el total_carrito
        self.total_carrito = 0;
        carrito.forEach((element: any) => {
          self.total_carrito += parseInt(element.cantidad);
        });

        // Actualizar la visualización del carrito
        $('.carrito span').html(self.total_carrito);

        // Habilitar el botón después de un breve retraso
        setTimeout(() => {
          btnAgregarHabilitado = true;
        }, 500);
      }
    });
  }



  ngAfterViewChecked(): void {
        this.titulos = []; // Initialize the titulos array

    $('.titulo_sucursal').each((index: number, element: HTMLElement) => {


      if(this.titulos.includes($(element).text())){
        $(element).css('display', 'none');
      }else{
        $(element).css('display', 'block');
      }

      this.titulos.push( $(element).text() );


      // Obtener datos del localStorage y asignar a productos_iniciales
      const localStorageData = localStorage.getItem('carrito');
      this.productos_iniciales = localStorageData ? JSON.parse(localStorageData) : [];

      // Actualizar el total_carrito
      this.total_carrito = 0;
      this.productos_iniciales.forEach((element: any) => {
        this.total_carrito += parseInt(element.cantidad);
      });

      $('.carrito span').html(this.total_carrito);




    });

  }



}
