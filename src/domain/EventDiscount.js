import Calender from './MakeCalender.js';
import MENUS from '../const/Menu.js';
import EVENT_TEXT from '../const/EventText.js';
import EVENT_STANDARD from '../const/EventStandard.js';
//할인 내역
class EventDiscount {
  #calender;
  #date;
  #discountContents;
  constructor(date) {
    this.#calender = new Calender();
    this.#date = date;
    this.#discountContents = {};
  }

  dDayDiscount() {
    if (this.#date > EVENT_STANDARD.discountStandard.dDayDiscountEnd) {
      return 0;
    }
    let discount = EVENT_STANDARD.discountStandard.dDayStartDiscount;
    for (let i = 1; i < this.#date; i++) {
      discount += EVENT_STANDARD.discountStandard.dDayPlusDiscount;
    }
    this.#discountContents[EVENT_TEXT.discountContents.dDayDiscount] = discount;
    return discount;
  }
  specialDiscount() {
    const discount = EVENT_STANDARD.discountStandard.specialDiscount;
    if (this.#calender.getSpecialDay().includes(this.#date)) {
      this.#discountContents[EVENT_TEXT.discountContents.specialDiscount] = discount;
      return discount;
    }
    return 0;
  }

  weekDiscount(menu, count) {
    for (const category in MENUS) {
      if (MENUS[category][menu] && category === EVENT_TEXT.eventMenu.weekday) {
        return this.#weekdayDiscount(count);
      }
      if (MENUS[category][menu] && category === EVENT_TEXT.eventMenu.weekend) {
        return this.#weekendDiscount(count);
      }
    }
    return 0;
  }

  #weekdayDiscount(count) {
    const discount = EVENT_STANDARD.discountStandard.weekDiscount * count;
    if (this.#calender.getWeekday().includes(this.#date)) {
      this.#discountContents[EVENT_TEXT.discountContents.weekdayDiscount] = discount;
      return discount;
    }
    return 0;
  }
  #weekendDiscount(count) {
    const discount = EVENT_STANDARD.discountStandard.weekDiscount * count;
    if (this.#calender.getWeekend().includes(this.#date)) {
      this.#discountContents[EVENT_TEXT.discountContents.weekendDiscount] = discount;
      return discount;
    }
    return 0;
  }

  getDiscountContents() {
    if (Object.keys(this.#discountContents).length === 0) {
      return EVENT_TEXT.notThing.none;
    }

    return this.#discountContents;
  }
}

export default EventDiscount;
