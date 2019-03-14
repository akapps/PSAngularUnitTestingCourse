import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  const pipe = new StrengthPipe();

  it('should display "weak" if the strength is 5', () => {
    let value = 5;

    expect(pipe.transform(value)).toBe("5 (weak)");
  })

  it('should display "strong" if the strength is 10', () => {
    let value = 10;

    expect(pipe.transform(value)).toBe("10 (strong)");
  })

  it('should display "unbelievable" if the strength is 20', () => {
    let value = 20;

    expect(pipe.transform(value)).toBe("20 (unbelievable)");
  })
})
