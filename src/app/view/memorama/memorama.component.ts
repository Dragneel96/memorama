import { Component, ChangeDetectorRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Card, CardValidation } from 'src/app/core/models/entry.model';
import { CardComponent } from 'src/app/core/components/card/card.component';
import { InitialsPipe } from 'src/app/core/pipe/initials.pipe';
import { ThemeService } from 'src/app/core/services/theme.service';


@Component({
  selector: 'app-memorama',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaComponent {

  username: string;
  data: Card[] = [];

  hits: number;
  errors: number;
  percentageHits: number = 0;
  percentageErrors: number = 0;

  dataValidation: CardValidation[] = [];

  isFinish: boolean = false;

  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;

  constructor(private router: Router, private dataService: DataService, private themeService: ThemeService, private changeDetectorRef: ChangeDetectorRef) {
    this.username = "";
    this.hits = 0;
    this.errors = 0;

  }

  async ngOnInit() {
    this.username = this.getusername() ?? "";

    this.data = []; // Inicializar data como un arreglo vacío
    try {
      const data: Card[] = await this.fetchData(5);
      this.data = data;
    } catch (error) {
      console.error(error);
    }

  }

  async level(level: string = 'low') {
    this.resetGame();
    let perPage = 5;

    if (level === 'medium') {
      perPage = 10;
    } else if (level === 'hard') {
      perPage = 20;
    }

    try {
      const data: Card[] = await this.fetchData(perPage);
      this.data = data;
    } catch (error) {
      console.error(error);
    }
  }




  getusername() {
    return localStorage.getItem('username');
  }

  exit() {
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }


  async onCardsClick(index: number) {
    const cardComponentsArray = this.cardComponents.toArray();
    cardComponentsArray[index].toggleImage();

    if (cardComponentsArray.every(card => card.showImage)) {
      this.isFinish = !this.isFinish
    }

    if (this.dataValidation.length == 0) {
      this.dataValidation.push({
        uuid: cardComponentsArray[index].uuid,
        id: index
      })
    } else {
      const isIndex = this.dataValidation.find((obj) => obj.id === index)
      if (!isIndex) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const isValid = this.dataValidation.find((obj) => obj.uuid === cardComponentsArray[index].uuid);
        if (isValid) {
          this.hits++;
          this.calculatePercentages(this.hits, this.errors);
        } else {
          this.errors++;
          cardComponentsArray[index].resetCard();
          if (this.dataValidation[0] && this.dataValidation[0].id !== undefined) {
            cardComponentsArray[this.dataValidation[0].id].resetCard();
          }
          this.calculatePercentages(this.hits, this.errors);
        }
        this.dataValidation = [];
      }
    }
  }


  resetGame() {
    // Step 1: Set all cards to their initial state
    const cardComponentsArray = this.cardComponents.toArray();
    cardComponentsArray.forEach(card => card.resetCard());

    // Step 2: Reset game statistics
    this.hits = 0;
    this.errors = 0;
    this.percentageHits = 0;
    this.percentageErrors = 0;

    // Step 3: Hidden Alert Finish and Show Game
    this.isFinish = false
  }



  calculatePercentages(hits: number, errors: number) {
    const total = hits + errors;
    this.percentageHits = (hits / total) * 100;
    this.percentageErrors = (errors / total) * 100;
  }


  toggleTheme(): void {
    const currentTheme = this.themeService.getCurrentTheme();
    if (currentTheme === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }


  async fetchData(perPage: number): Promise<Card[]> {
    try {
      const data = await this.dataService.getData(perPage).toPromise();
      if (!data) {
        return [];
      }
      const shuffledData = data.concat([...data]).flat().sort(() => Math.random() - 0.5);
      return shuffledData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }


}
