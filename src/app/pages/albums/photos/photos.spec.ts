import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photos } from './photos';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('Photos', () => {
  let component: Photos;
  let fixture: ComponentFixture<Photos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Photos],
      providers: [provideHttpClient(), provideRouter([], withComponentInputBinding())],
    }).compileComponents();

    fixture = TestBed.createComponent(Photos);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', '1');

    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(Photos);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
  it('should have the correct id from input', () => {
    expect(component.id()).toBe('1');
  });
});
