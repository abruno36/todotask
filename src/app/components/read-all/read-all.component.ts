import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodotaskService } from 'src/app/services/todotask.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;
  list: Todo[] = []
  listFinished: Todo[] = [];
  
  isLoadingCompleted: boolean = false;
  dataSource = new MatTableDataSource<Todo>(this.list);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
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
          this.list.push(todo);
          //paginator
          this.dataSource = new MatTableDataSource<Todo>(this.list);
          this.dataSource.paginator = this.paginator;
          this.isLoadingCompleted = true;
        }
      });
      this.closed = this.listFinished.length;
    });
  }

  finalizar(item: Todo): void {
    item.finalizado = true;
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

}
