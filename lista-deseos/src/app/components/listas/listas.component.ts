import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;
  @ViewChild(IonList, { static: false }) lista: IonList;

  constructor(public deseosService: DeseosService,
    private router: Router,
    private alertCtr: AlertController) { }

  ngOnInit() {}


listaSeleccionada( lista: Lista ) {
  console.log({lista});

  if ( this.terminada ) {
    this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
  } else {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);

  }
}

borrarLista( lista: Lista ) {
  this.deseosService.borrarLista(lista);
}

async editarTitulo( lista: Lista ) {
  const alert = await this.alertCtr.create({
    header: 'Editar titulo',
    inputs: [
      {
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
      }
    ],
    buttons: [{
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.lista.closeSlidingItems();

      }
    },
    {
      text: 'Editar',
      handler: ( data ) => {
        if ( data.titulo.lengt === 0 ) {
          return;
        }

        lista.titulo = data.titulo;
        this.deseosService.guardarStorage();
        this.lista.closeSlidingItems();
      }
    }
  ]
  });

  alert.present();
}

}
