import Calendar from '../src/domain/MakeCalender.js';

describe('Calendar', () => {
  let calendar;
  let weekday, weekend, specialDay;

  beforeEach(() => {
    calendar = new Calendar();
    weekday = calendar.getWeekday();
    weekend = calendar.getWeekend();
    specialDay = calendar.getSpecialDay();
  });

  test('주말과 평일 체크', () => {
    const expectedWeekday = [
      3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31,
    ];
    const expectedWeekend = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];

    expect(weekday).toEqual(expect.arrayContaining(expectedWeekday));
    expect(weekend).toEqual(expect.arrayContaining(expectedWeekend));
  });

  test('스페셜 데이 체크', () => {
    const expectedSpecialDay = [25, 3, 10, 17, 24, 31];

    expect(specialDay).toEqual(expect.arrayContaining(expectedSpecialDay));
  });
});
