import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodotaskService } from 'src/app/services/todotask.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;
  list: Todo[] = []
  listFinished: Todo[] = [];
  
  displayedColumns: string[] = ["id","titulo", "descricao", "dataParaFinalizar", "acoes"];
  dataSource = new MatTableDataSource<Todo>(this.list);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
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
        } else {
          //console.log("resposta");
          //console.log(resposta);
          this.list.push(todo);
          //console.log("lista");
          //console.log(this.list);
          //paginator
          this.dataSource = new MatTableDataSource<Todo>(this.list);
          //paginator
          this.dataSource.paginator = this.paginator;
          //sort - incluir no app.module: MatTableModule,MatPaginatorModule,MatSidenavModule,MatListModule,MatSortModule 
          this.dataSource.sort = this.sort;
          //console.log("dataSource");
          //console.log(this.dataSource);
          //console.log("lista Finalizados");
          //console.log(this.listFinished);
        }
      });
      this.closed = this.listFinished.length;
    });
  }

  finalizar(item: Todo): void {
    item.finalizado = true;
    console.log("item finalizado");
    console.log(item);
    this.service.update(item).subscribe(() => {
      this.service.message("Task finalizada com sucesso!");
      this.list = this.list.filter((todo) => todo.id !== item.id);
      this.closed++;
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message("Task deletada com sucesso!");
        this.list = this.list.filter((todo) => todo.id !== id);
      }
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(["finalizados"]);
  }

  navegarParaCreate() {
    this.router.navigate(["/create"])
  }
}
