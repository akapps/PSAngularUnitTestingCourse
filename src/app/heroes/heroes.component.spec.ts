import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";

import { of } from "rxjs";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 15, name: 'Magneta', strength: 22 },
      { id: 17, name: 'Dynama', strength: 43 },
      { id: 18, name: 'Dr IQ', strength: 4 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHero', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  })

  describe('delete', () => {
    it('should remove the indicated hero from the heros list', () => {
      component.heroes = HEROES;
      let toDelete = HEROES[2];

      mockHeroService.deleteHero.and.returnValue(of(true));

      // when
      component.delete(toDelete);

      // then
      expect(component.heroes.length).toBe(2);
      expect(component.heroes).not.toContain(toDelete);
    })

    it('should call deleteHero from the HeroService', () => {
      let toDelete = HEROES[0];
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      // when
      component.delete(toDelete);

      // then
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(toDelete);
    })
  })
})
