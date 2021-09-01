import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Todo>(this.listFinished);

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
                    //paginator
          this.dataSource = new MatTableDataSource<Todo>(this.listFinished);
          this.dataSource.paginator = this.paginator;
        } 
      });
    });
  }

  voltar(): void {
    this.router.navigate([''])
  }

}
