import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe('HeroService', () => {
  let mockMessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add', 'clear']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });
  });

  describe('getHero', () => {

    const heroData = { id: 4, name: 'SuperDude', strength: 100 };

    it('should call get with the correct URL',
      inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
        service.getHero(4).subscribe(val => {
          expect(val).toEqual(heroData);
        });

        controller.expectOne('api/heroes/4').flush(heroData);
        controller.verify();
      }));


    it('should call get with the correct URL (test impl. variant)', () => {
      // given (note that they could be initialized in a "beforeEach" statement)
      let controller: HttpTestingController = TestBed.get(HttpTestingController);
      let service: HeroService = TestBed.get(HeroService);

      // repeat test here:
      service.getHero(4).subscribe(val => {
        expect(val).toEqual(heroData);
      });

      controller.expectOne('api/heroes/4').flush(heroData);
      controller.verify();
    });
  });

})
