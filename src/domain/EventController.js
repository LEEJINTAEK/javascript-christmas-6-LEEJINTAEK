// 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액
import MENUS from '../const/Menu.js';
import EventDiscount from './EventDiscount.js';
import EventBadge from './EventBadge.js';
import EventText from '../const/EventText.js';
import EventStandard from '../const/EventStandard.js';
import EventError from '../const/EventError.js';

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
    const contents = [
      EventText.eventContents.bonus,
      EventText.eventContents.benefitContents,
      EventText.eventContents.badge,
    ];
    contents.forEach((event) => {
      this.#eventContents[event] = EventText.notThing.none;
    });
    this.#eventContents[EventText.eventContents.totalBenefit] = 0;
    this.#eventContents[EventText.eventContents.bill] = 0;
  }

  #event(totalAmount, date, menus) {
    this.#getBenefit(totalAmount, menus, date);
    this.#getEventBadge();
  }

  #getBenefit(totalAmount, menus, date) {
    const eventDiscount = new EventDiscount(date);

    let discount = eventDiscount.dDayDiscount() + eventDiscount.specialDiscount();
    discount += this.#getWeekDiscount(menus, eventDiscount);
    this.#eventContents[EventText.eventContents.totalBenefit] = discount;

    this.#discountContents = eventDiscount.getDiscountContents();
    this.#getBonusMenu(totalAmount);

    this.#eventContents[EventText.eventContents.benefitContents] = this.#discountContents;
  }

  #getWeekDiscount(menus, eventDiscount) {
    let discount = 0;
    for (const [menu, count] of menus) {
      discount += eventDiscount.weekDiscount(menu, Number(count));
    }
    return discount;
  }

  #getBonusMenu(totalAmount) {
    if (totalAmount >= EventStandard.bonusStandard.price) {
      this.#eventContents[EventText.eventContents.bonus] = EventText.bonusMenu.menu;

      const bonusMenuPrice = MENUS[EventText.bonusMenu.category][EventText.bonusMenu.menu];

      this.#eventContents[EventText.eventContents.totalBenefit] += bonusMenuPrice;

      this.#eventContents[EventText.eventContents.bill] += bonusMenuPrice; //할인전 - (할인혜택 +보너스) - 보너스

      this.#discountContents[EventText.discountContents.bonus] = bonusMenuPrice;
    }
  }

  #getEventBadge() {
    this.#eventContents[EventText.eventContents.badge] = EventBadge.getEventBadge(
      this.#eventContents[EventText.eventContents.totalBenefit],
    );
  }

  getEventBenefit() {
    return this.#eventContents;
  }
}

export default EventController;
