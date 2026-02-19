import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu closed by default', () => {
    const mobileMenu = fixture.debugElement.query(By.css('.animate-in'));
    expect(mobileMenu).toBeFalsy();
  });

  it('should toggle menu when clicking the hamburger button', () => {
    const button = fixture.debugElement.query(By.css('button.md\\:hidden'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    let mobileMenu = fixture.debugElement.query(By.css('.animate-in'));
    expect(component['isMenuOpen']()).toBe(true);
    expect(mobileMenu).toBeTruthy();

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    mobileMenu = fixture.debugElement.query(By.css('.animate-in'));
    expect(component['isMenuOpen']()).toBe(false);
    expect(mobileMenu).toBeFalsy();
  });

  it('should close menu when a link is clicked', () => {
    component['isMenuOpen'].set(true);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a.block'));
    link.triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();

    expect(component['isMenuOpen']()).toBe(false);
  });

  it('should toggle isMenuOpen signal when toggleMenu is called', () => {
    expect(component['isMenuOpen']()).toBe(false);

    component.toggleMenu();
    expect(component['isMenuOpen']()).toBe(true);

    component.toggleMenu();
    expect(component['isMenuOpen']()).toBe(false);
  });
});
