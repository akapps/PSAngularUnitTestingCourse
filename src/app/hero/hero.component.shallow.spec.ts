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

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
  });

})
