import EventDiscount from '../src/domain/EventDiscount.js';

describe('EventDiscount', () => {
  let eventDiscount;
  const mockDate = 10;

  test('dDayDiscount 정확도', () => {
    eventDiscount = new EventDiscount(mockDate);

    const expectedDiscount = 1900;
    expect(eventDiscount.dDayDiscount()).toEqual(expectedDiscount);
  });

  test('specialDiscount 정확도', () => {
    eventDiscount = new EventDiscount(mockDate);

    const expectedDiscount = 1000;
    expect(eventDiscount.specialDiscount()).toEqual(expectedDiscount);
  });

  test('weekdayDiscount 정확도', () => {
    eventDiscount = new EventDiscount(mockDate);

    const expectedDiscount = 4046;
    const menu = '초코케이크';
    const count = 2;
    expect(eventDiscount.weekDiscount(menu, count)).toEqual(expectedDiscount);
  });

  test('weekendDiscount 정확도', () => {
    eventDiscount = new EventDiscount(mockDate);

    const expectedDiscount = 0;
    const menu = '티본스테이크';
    const count = 1;
    expect(eventDiscount.weekDiscount(menu, count)).toEqual(expectedDiscount);
  });

  test('getDiscountContents 정확도', () => {
    eventDiscount = new EventDiscount(mockDate);

    const menu = '초코케이크';
    const count = 2;

    eventDiscount.dDayDiscount();
    eventDiscount.specialDiscount();
    eventDiscount.weekDiscount(menu, count);

    const discountContents = eventDiscount.getDiscountContents();

    const expectedContents = {
      '크리스마스 디데이 할인': 1900,
      '특별 할인': 1000,
      '평일 할인': 4046,
    };

    expect(discountContents).toEqual(expectedContents);
  });

  test('getDiscountContents 정확도 (할인 미적용)', () => {
    const mockDate = 26;
    eventDiscount = new EventDiscount(mockDate);

    const menu = '티본스테이크';
    const count = 1;

    eventDiscount.dDayDiscount();
    eventDiscount.specialDiscount();
    eventDiscount.weekDiscount(menu, count);

    const discountContents = eventDiscount.getDiscountContents();
    const expectedContents = '없음';

    expect(discountContents).toEqual(expectedContents);
  });
});
