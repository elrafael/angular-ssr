import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TodosService } from '../../services/todos-service';
import { Todos } from './todos';

describe('Todos Component', () => {
  let component: Todos;
  let fixture: ComponentFixture<Todos>;

  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false, userName: 'User 1' },
    { id: 2, title: 'Todo 2', completed: true, userName: 'User 1' },
  ];

  const todosServiceMock = {
    getTodos: vi.fn(() => of(mockTodos)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todos],
      providers: [provideHttpClient(), { provide: TodosService, useValue: todosServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Todos);
    component = fixture.componentInstance;
  });

  it('should create and render basic structure', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Todos');
  });

  it('should render todos list when defer block is complete', async () => {
    fixture.detectChanges();

    const deferBlock = (await fixture.getDeferBlocks())[0];

    await deferBlock.render(DeferBlockState.Complete);
    fixture.detectChanges();

    const todoItems = fixture.debugElement.queryAll(By.css('.group'));
    expect(todoItems.length).toBe(2);

    const firstTodoTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(firstTodoTitle.textContent).toContain('Todo 1');
  });
});
