import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodotaskService } from 'src/app/services/todotask.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  titulo = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
  descricao = new FormControl ('', [Validators.required,  Validators.minLength(5), Validators.maxLength(200)])
 
  constructor(
    private router: Router, 
    private service: TodotaskService) { }

  ngOnInit(): void {
  }

  create(): void {
    this.formataData();
    this.service.create(this.todo).subscribe((resposta) => {
      this.service.message('To-do criado com sucesso!');
      this.router.navigate(['todotask']);
    }, err => {
      this.service.message('Falha ao criar To-do');
      this.router.navigate(['todotask']);
    })
  }

  cancel(): void {
    this.router.navigate(['todotask'])
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  errorValidTitulo() {
    if(this.titulo.invalid) {
      return "O TITULO deve ter entre 5 e 50 caracteres";
    }
    return false;
  }

  errorValidDescricao() {
    if(this.descricao.invalid) {
      return "O DESCRIÇÃO deve ter entre 5 e 50 caracteres";
    }
    return false;
  }

}
