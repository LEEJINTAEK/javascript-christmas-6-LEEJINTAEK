// 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액
import MENUS from './Menu.js';
import EventDiscount from './EventDiscount.js';
import EventBadge from './EventBadge.js';

class EventController {
  #eventContents = {};
  #discountContents;

  constructor(totalAmount, eventMode, date, menus) {
    this.#eventContentsMaker();

    if (eventMode) {
      this.#event(totalAmount, date, menus);
    }
  }

  #eventContentsMaker() {
    const contents = ['증정 메뉴', '혜택 내역', '이벤트 배지'];
    const NO_BENEFIT = '없음';

    contents.forEach((event) => {
      this.#eventContents[event] = NO_BENEFIT;
    });
    this.#eventContents['총혜택 금액'] = 0;
  }

  #event(totalAmount, date, menus) {
    this.#getBenefit(totalAmount, menus, date);
    this.#getEventBadge();
  }

  #getBenefit(totalAmount, menus, date) {
    const eventDiscount = new EventDiscount(date);

    let discount = eventDiscount.dDayDiscount() + eventDiscount.specialDiscount();
    discount += this.#getWeekDiscount(menus, date, eventDiscount);
    this.#eventContents['총혜택 금액'] = discount;

    this.#discountContents = eventDiscount.getDiscountContents();
    this.#getBonusMenu(totalAmount);

    this.#eventContents['혜택 내역'] = this.#discountContents;
  }

  #getWeekDiscount(menus, date, eventDiscount) {
    let discount = 0;
    for (const [menu, count] of menus) {
      discount += eventDiscount.weekDiscount(menu, Number(count));
    }
    return discount;
  }

  #getBonusMenu(totalAmount) {
    const EVENT_CATEGORY = 'DRINK';
    const EVENT_MENU = '샴페인';
    if (totalAmount > 120000) {
      this.#eventContents['증정 메뉴'] = EVENT_MENU;
      this.#eventContents['총혜택 금액'] += MENUS[EVENT_CATEGORY][EVENT_MENU];
      this.#discountContents['증정 이벤트'] = MENUS[EVENT_CATEGORY][EVENT_MENU];
    }
  }

  #getEventBadge() {
    this.#eventContents['이벤트 배지'] = EventBadge.getEventBadge(
      this.#eventContents['총혜택 금액'],
    );
  }

  getEventBenefit() {
    return this.#eventContents;
  }
}

export default EventController;
