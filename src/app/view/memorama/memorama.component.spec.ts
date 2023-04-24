import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoramaComponent } from './memorama.component';
import { DataService } from 'src/app/core/services/data.service';
import { Card, CardValidation } from 'src/app/core/models/entry.model';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { InitialsPipe } from 'src/app/core/pipe/initials.pipe';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';



describe('MemoramaComponent', () => {
  let component: MemoramaComponent;
  let fixture: ComponentFixture<MemoramaComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let themeService: ThemeService;


  beforeEach(() => {
    const spyDataService = jasmine.createSpyObj('DataService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [MemoramaComponent, InitialsPipe],
      imports: [HttpClientModule],
      providers: [{ provide: DataService, useValue: spyDataService }]
    });

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    themeService = TestBed.inject(ThemeService);
    fixture = TestBed.createComponent(MemoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and shuffle it', async () => {
    const perPage = 1;
    const data: Card[] = [{ uuid: '1ui', imageUrl: 'imagen.png', title: 'Imagen' }];
    dataService.getData.and.returnValue(of(data));

    const shuffledData = await component.fetchData(perPage);

    expect(shuffledData.length).toEqual(2 * perPage);
    expect(shuffledData).not.toEqual(data);
  });

  it('should toggle the theme from light to dark', () => {
    spyOn(themeService, 'getCurrentTheme').and.returnValue('light');
    const setThemeSpy = spyOn(themeService, 'setTheme');

    component.toggleTheme();

    expect(setThemeSpy).toHaveBeenCalledWith('dark');
  });

  it('should toggle the theme from dark to light', () => {
    spyOn(themeService, 'getCurrentTheme').and.returnValue('dark');
    const setThemeSpy = spyOn(themeService, 'setTheme');

    component.toggleTheme();

    expect(setThemeSpy).toHaveBeenCalledWith('light');
  });
});
