import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('HeroComponent (shallow)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]  // ignore HTML schemas errors --> can hide real issues
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct Hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

    // silly test, just to demonstrate:
    expect(fixture.componentInstance.hero.name).toBe('SuperDude');
  });

})
