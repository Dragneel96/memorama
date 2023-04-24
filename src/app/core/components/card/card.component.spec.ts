import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name of the card', () => {
    const name = 'Card Name';
    component.name = name;
    fixture.detectChanges();
    const nameElement = fixture.debugElement.query(By.css('.card-name')).nativeElement;
    expect(nameElement.textContent.trim()).toEqual(name);
  });

  it('should not display the image by default', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeFalsy();
  });

  it('should display the image when clicked', () => {
    component.urlImage = 'http://example.com/image.jpg';
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('.card'));
    cardElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.properties['src']).toEqual(component.urlImage);
  });

  it('should reset the card when clicked twice', () => {
    component.urlImage = 'http://example.com/image.jpg';
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('.card'));
    cardElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    cardElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeFalsy();
    expect(component.showImage).toBeFalsy();
  });
});
