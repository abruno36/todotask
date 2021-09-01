import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodotaskService } from 'src/app/services/todotask.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  titulo = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
  descricao = new FormControl ('', [Validators.required,  Validators.minLength(5), Validators.maxLength(50)])
 
  constructor(
    private router: Router, 
    private service: TodotaskService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((resposta) => {
      this.todo = resposta;
    })
  }

  update(): void {
    this.formataData();
    this.service.update(this.todo).subscribe((resposta) => {
      this.service.message('Informações atualizadas com sucesso!');
      this.router.navigate(['']);
    }, error => {
      this.service.message('Falha ao atualizar To-do!');
      this.router.navigate(['']);
    })
  }

  cancel(): void {
    this.router.navigate([''])
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
