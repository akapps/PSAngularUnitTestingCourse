import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";

describe('HeroesComponent (deep)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [ HeroesComponent, HeroComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()   // start Ng lifecycle

    const elements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(elements.length).toBe(2);
    elements.forEach((elt, index) => {
      expect(elt.componentInstance.hero).toBe(HEROES[index]);
    });
  });

})
