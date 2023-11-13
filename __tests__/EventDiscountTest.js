import EventDiscount from '../src/domain/EventDiscount.js';

describe('EventDiscount', () => {
  let eventDiscount;
  const mockDate = 10;

  beforeEach(() => {
    eventDiscount = new EventDiscount(mockDate);
  });

  test('dDayDiscount 정확도', () => {
    const expectedDiscount = 1900;
    expect(eventDiscount.dDayDiscount()).toEqual(expectedDiscount);
  });

  test('specialDiscount 정확도', () => {
    const expectedDiscount = 1000;
    expect(eventDiscount.specailDiscount()).toEqual(expectedDiscount);
  });

  test('weekdayDiscount 정확도', () => {
    const expectedDiscount = 4046;
    const menu = '초코케이크';
    const count = 2;
    expect(eventDiscount.weekDiscount(menu, count)).toEqual(expectedDiscount);
  });

  test('weekendDiscount 정확도', () => {
    const expectedDiscount = 0;
    const menu = '티본스테이크';
    const count = 1;
    expect(eventDiscount.weekDiscount(menu, count)).toEqual(expectedDiscount);
  });
});
