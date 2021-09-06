import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodotaskService } from 'src/app/services/todotask.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  listFinished: Todo[] = [];
 
  dataSource = new MatTableDataSource<Todo>(this.listFinished);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["titulo", "descricao", "dataParaFinalizar"];

  constructor(
    private service: TodotaskService, 
    private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
          
          this.dataSource = new MatTableDataSource<Todo>(this.listFinished);
          //paginator
          this.dataSource.paginator = this.paginator;
          //sort - incluir no app.module: MatTableModule,MatPaginatorModule,MatSidenavModule,MatListModule,MatSortModule 
          this.dataSource.sort = this.sort;
        } 
      });
    });
  }

  voltar(): void {
    this.router.navigate(['todotask'])
  }

}
