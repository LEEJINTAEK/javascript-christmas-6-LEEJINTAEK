import EventConditionController from './EventConditionController';

describe('EventConditionController', () => {
  it('주문 금액 만원 이상', () => {
    const controller = new EventConditionController(10000);
    expect(controller.getEventMode()).toBe(true);
  });

  it('주문 금액 만원 이하', () => {
    const controller = new EventConditionController(5000);
    expect(controller.getEventMode()).toBe(false);
  });
});
