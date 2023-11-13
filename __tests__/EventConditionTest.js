import EventConditionController from '../src/domain/EventCondition.js';

describe('EventConditionController', () => {
  test('주문 금액 만원 이상', () => {
    const controller = new EventConditionController(10000);
    expect(controller.getEventMode()).toBe(true);
  });

  test('주문 금액 만원 이하', () => {
    const controller = new EventConditionController(5000);
    expect(controller.getEventMode()).toBe(false);
  });
});
