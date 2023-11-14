import Calender from './MakeCalender.js';
import MENUS from './Menu.js';
import EventText from '../const/EventText.js';
import EventStandard from '../const/EventStandard.js';

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
    if (this.#date >= EventStandard.discountStandard.dDayDiscountEnd) {
      return 0;
    }
    let discount = EventStandard.discountStandard.dDayStartDiscount;
    for (let i = 1; i < this.#date; i++) {
      discount += EventStandard.discountStandard.dDayPlusDiscount;
    }
    this.#discountContents[EventText.discountContents.dDayDiscount] = discount;
    return discount;
  }
  specialDiscount() {
    const discount = EventStandard.discountStandard.specialDiscount;
    if (this.#calender.getSpecialDay().includes(this.#date)) {
      this.#discountContents[EventText.discountContents.specialDiscount] = discount;
      return discount;
    }
    return 0;
  }

  weekDiscount(menu, count) {
    for (const category in MENUS) {
      if (MENUS[category][menu] && category === EventText.eventMenu.weekday) {
        return this.#weekdayDiscount(count);
      }
      if (MENUS[category][menu] && category === EventText.eventMenu.weekend) {
        return this.#weekendDiscount(count);
      }
    }
    return 0;
  }

  #weekdayDiscount(count) {
    const discount = EventStandard.discountStandard.weekDiscount * count;
    if (this.#calender.getWeekday().includes(this.#date)) {
      this.#discountContents[EventText.discountContents.weekdayDiscount] = discount;
      return discount;
    }
    return 0;
  }
  #weekendDiscount(count) {
    const discount = EventStandard.discountStandard.weekDiscount * count;
    if (this.#calender.getWeekend().includes(this.#date)) {
      this.#discountContents[EventText.discountContents.weekendDiscount] = discount;
      return discount;
    }
    return 0;
  }

  getDiscountContents() {
    if (Object.keys(this.#discountContents).length === 0) {
      return EventText.notThing.none;
    }

    return this.#discountContents;
  }
}

export default EventDiscount;
