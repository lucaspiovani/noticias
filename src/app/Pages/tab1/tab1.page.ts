import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor( private NoticiasService: NoticiasService) {

  }

  ngOnInit () {
   this.cargarNoticias();
  }

  loadData( event) {
   // console.log(event);

    this.cargarNoticias( event );
  }

  cargarNoticias( event? ) {
    this.NoticiasService.getTopHeadlines ()
    .subscribe ( resp => {

      if ( resp.articles.length === 0 ) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
     // console.log ('noticias' , resp);
      //this.noticias = resp.articles;
      this.noticias.push( ...resp.articles );

      if( event ){
        event.target.complete();
      }

    });
  }

}


