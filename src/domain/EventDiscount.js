import Calender from './MakeCalender.js';
import MENUS from './Menu.js';

class EventDiscount {
  #calender;
  #date;
  constructor(date) {
    this.#calender = new Calender();
    this.#date = date;
  }

  dDayDiscount() {
    if (this.#date >= 25) {
      return 0;
    }
    let discount = 1000;
    for (let i = 1; i < this.#date; i++) {
      discount += 100;
    }
    return discount;
  }
  specailDiscount() {
    if (this.#calender.getSpecialDay().includes(this.#date)) {
      return 1000;
    }
    return 0;
  }

  weekDiscount(menu, count) {
    for (const category in MENUS) {
      if (MENUS[category][menu] && category === 'DESSERT') {
        return this.#weekdayDiscount(count);
      }
      if (MENUS[category][menu] && category === 'MAIN') {
        return this.#weekendDiscount(count);
      }
    }
    return 0;
  }

  #weekdayDiscount(count) {
    if (this.#calender.getWeekday().includes(this.#date)) {
      return 2023 * count;
    }
    return 0;
  }
  #weekendDiscount(count) {
    if (this.#calender.getWeekend().includes(this.#date)) {
      return 2023 * count;
    }
    return 0;
  }
}

export default EventDiscount;
