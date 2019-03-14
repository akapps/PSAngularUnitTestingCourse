import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";
import { of } from "rxjs";

import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";

describe('HeroesComponent (shallow)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [ HeroesComponent, FakeHeroComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    let heroesList = [
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 }
    ];
    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes).toEqual(heroesList);
  })
})
