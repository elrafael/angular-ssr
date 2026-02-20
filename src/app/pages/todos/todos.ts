import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos-service';
import { Todo } from '../../shared/interfaces/todo';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [CommonModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {
  private readonly todosService = inject(TodosService);
  protected todos: Observable<Todo[]> = this.todosService.getTodos();

  constructor() {
    afterNextRender(() => {
      console.log('Todos component rendered');
    });
  }

  ngOnInit(): void {
    console.log('Todos component initialized');
  }
}
