import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  public showImage: boolean = false;
  @Input() urlImage: string = "";
  @Input() name: string = "";
  @Input() uuid: string = "";

  public clicked: boolean = false;

  public toggleImage() {
    if (!this.clicked) {
      this.showImage = !this.showImage;
      this.clicked = true;
    }
  }

  public resetCard() {
    this.showImage = false;
    this.clicked = false;
  }



}
