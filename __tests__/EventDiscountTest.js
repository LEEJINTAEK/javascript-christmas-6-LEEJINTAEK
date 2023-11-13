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
    expect(eventDiscount.specialDiscount()).toEqual(expectedDiscount);
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

  test('getDiscountContents 정확도', () => {
    const menu = '초코케이크';
    const count = 2;

    // 먼저 discount를 계산하도록
    eventDiscount.dDayDiscount();
    eventDiscount.specialDiscount();
    eventDiscount.weekDiscount(menu, count);

    const discountContents = eventDiscount.getDiscountContents();

    // 예상 결과 설정
    const expectedContents = {
      '크리스마스 디데이 할인': 1900,
      '특별 할인': 1000,
      '평일 할인': 4046,
    };

    // 결과 비교
    expect(discountContents).toEqual(expectedContents);
  });
});
