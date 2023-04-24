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

  /**
   * The function initializes the component by setting the username and fetching data asynchronously.
   */
  async ngOnInit() {
    this.username = this.getusername() ?? "";
    this.data = [];
    try {
      const data: Card[] = await this.fetchData(5);
      this.data = data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * This is an asynchronous function that sets the level of the game and fetches data based on the
   * level.
   * @param {string} [level=low] - A string parameter that determines the difficulty level of the game.
   * It has a default value of 'low'. The function resets the game, sets the number of cards per page
   * based on the level parameter, and then fetches data using the fetchData method. The fetched data
   * is then stored in the data property
   */
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

  /**
   * This function retrieves the username from local storage.
   * @returns the value of the 'username' key stored in the browser's localStorage.
   */
  getusername() {
    return localStorage.getItem('username');
  }

  /**
   * The function removes the username from local storage and navigates to the home page.
   */
  exit() {
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }


  /**
   * This function handles the logic for when a card is clicked in a memory game, checking if the
   * selected cards match and updating the game state accordingly.
   * @param {number} index - The index parameter is a number that represents the index of the card
   * component that was clicked.
   */
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

  /**
   * The function resets the game by resetting all cards to their initial state, resetting game
   * statistics, and hiding the finish alert.
   */
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

  /**
   * This function calculates the percentage of hits and errors based on the total number of hits and
   * errors.
   * @param {number} hits - The number of successful hits or events.
   * @param {number} errors - The "errors" parameter is a number representing the total number of
   * errors in a given scenario.
   */
  calculatePercentages(hits: number, errors: number) {
    const total = hits + errors;
    this.percentageHits = (hits / total) * 100;
    this.percentageErrors = (errors / total) * 100;
  }


  /**
   * This function toggles between a light and dark theme using a theme service.
   */
  toggleTheme(): void {
    const currentTheme = this.themeService.getCurrentTheme();
    if (currentTheme === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }


  /**
   * This function fetches data from a service, shuffles it randomly, and returns it as an array of
   * cards.
   * @param {number} perPage - The `perPage` parameter is a number that represents the number of items
   * to be fetched per page from the `dataService`.
   * @returns The `fetchData` function returns a Promise that resolves to an array of `Card` objects.
   * If there is an error, it returns an empty array.
   */
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
