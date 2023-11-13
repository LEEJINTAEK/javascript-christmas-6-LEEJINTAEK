import EventController from '../src/domain/EventController.js';

describe('EventController', () => {
  const testCases = [
    [
      139000,
      true,
      10,
      [
        ['초코케이크', '2'],
        ['티본스테이크', '1'],
        ['바비큐립', '1'],
      ],
      {
        '증정 메뉴': '샴페인',
        '혜택 내역': {
          '크리스마스 디데이 할인': 1900,
          '특별 할인': 1000,
          '평일 할인': 4046,
          '증정 이벤트': 25000,
        },
        '이벤트 배지': '산타',
        '총혜택 금액': 31946,
      },
    ],
    [
      8000,
      false,
      10,
      [['시저샐러드', '1']],
      {
        '증정 메뉴': '없음',
        '혜택 내역': '없음',
        '이벤트 배지': '없음',
        '총혜택 금액': 0,
      },
    ],
  ];

  test.each(testCases)(
    'getEventBenefit 정확도 => EventController 정상 작동',
    (totalAmount, eventMode, date, menus, expectedBenefit) => {
      const eventController = new EventController(totalAmount, eventMode, date, menus);
      expect(eventController.getEventBenefit()).toEqual(expectedBenefit);
    },
  );
});
