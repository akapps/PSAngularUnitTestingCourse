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

  it('should call HeroService.deleteHero when the delete button is clicked', () => {
    // In this version of the test we access the button element in the DOM
    //    to raise the "click" event

    // Not especially interesting here, but we can also spy on one of
    // the component's own method and check if it has been called (use callThrough() to delegate the call):
    spyOn(fixture.componentInstance, 'delete').and.callThrough();

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()   // start Ng lifecycle
    mockHeroService.deleteHero.and.returnValue(of(true));

    // when
    const elements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    elements[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});

    // then
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should call HeroService.deleteHero when the delete button is clicked (impl. variant)', () => {
    // In this version of the test we access the HeroComponent.delete (EventEmitter object)
    //    to trigger the event directly (ie the binding is not tested)

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges()   // start Ng lifecycle
    mockHeroService.deleteHero.and.returnValue(of(true));

    // when
    const elements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>elements[0].componentInstance).delete.emit(undefined);

    // then
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

})
