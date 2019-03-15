import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";

import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  let routeParamId: string = '3';

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => routeParamId } }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'ToToRo', strength: 150 }));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('TOTORO');
  });

  it('should call updateHero when save is called - after 250ms', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    tick(250);    // simulates we advance by 250ms in the future - not waiting
    // alternative: flush();  - no time has to be specified, it executes every registered tasks

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

})
