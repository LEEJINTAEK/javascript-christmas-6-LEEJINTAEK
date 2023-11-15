import MENUS from '../const/Menu.js';
import EventDiscount from './EventDiscount.js';
import EventBadge from './EventBadge.js';
import EVENT_TEXT from '../const/EventText.js';
import EVENT_STANDARD from '../const/EventStandard.js';
import EventError from '../const/EventError.js';

class EventController {
  #eventContents = {};
  #discountContents;

  constructor(totalAmount, eventMode, date, menus) {
    this.#eventContentsMaker(); //내역 초기 값

    if (eventMode) {
      //이벤트 조건에 맞을 때
      this.#event(totalAmount, date, menus);
    }
  }

  #eventContentsMaker() {
    const contents = [
      EVENT_TEXT.eventContents.bonus,
      EVENT_TEXT.eventContents.benefitContents,
      EVENT_TEXT.eventContents.badge,
    ];
    contents.forEach((event) => {
      this.#eventContents[event] = EVENT_TEXT.notThing.none; //'없음'
    });
    this.#eventContents[EVENT_TEXT.eventContents.totalBenefit] = 0;
    this.#eventContents[EVENT_TEXT.eventContents.bill] = 0;
  }

  #event(totalAmount, date, menus) {
    this.#getBenefit(totalAmount, menus, date);
    this.#getEventBadge();
  }

  //받은 혜택 get
  #getBenefit(totalAmount, menus, date) {
    const eventDiscount = new EventDiscount(date);

    //할인
    let discount = eventDiscount.dDayDiscount() + eventDiscount.specialDiscount();
    discount += this.#getWeekDiscount(menus, eventDiscount);

    this.#eventContents[EVENT_TEXT.eventContents.totalBenefit] = discount; //총 할인 혜택 저장
    this.#discountContents = eventDiscount.getDiscountContents();

    this.#getBonusMenu(totalAmount);

    this.#eventContents[EVENT_TEXT.eventContents.benefitContents] = this.#discountContents; //할인 혜택 내용 저장
  }

  #getWeekDiscount(menus, eventDiscount) {
    let discount = 0;
    for (const [menu, count] of menus) {
      discount += eventDiscount.weekDiscount(menu, Number(count));
    }
    return discount;
  }

  //증정 메뉴
  #getBonusMenu(totalAmount) {
    if (totalAmount >= EVENT_STANDARD.bonusStandard.price) {
      this.#eventContents[EVENT_TEXT.eventContents.bonus] = EVENT_TEXT.bonusMenu.menu; //증정 메뉴 저장

      const bonusMenuPrice = MENUS[EVENT_TEXT.bonusMenu.category][EVENT_TEXT.bonusMenu.menu];

      this.#eventContents[EVENT_TEXT.eventContents.totalBenefit] += bonusMenuPrice; //증정 메뉴 혜택금액에 저장

      this.#eventContents[EVENT_TEXT.eventContents.bill] += bonusMenuPrice; //할인 후 예상 금액에서 증정 메뉴 가격 차감
      this.#discountContents[EVENT_TEXT.discountContents.bonus] = bonusMenuPrice; //혜택 내용, 증정 메뉴 가격 추가
    }
  }

  #getEventBadge() {
    this.#eventContents[EVENT_TEXT.eventContents.badge] = EventBadge.getEventBadge(
      this.#eventContents[EVENT_TEXT.eventContents.totalBenefit], //이벤트 배지 저장
    );
  }

  getEventBenefit() {
    return this.#eventContents;
  }
}

export default EventController;
