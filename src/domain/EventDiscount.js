import Calender from './MakeCalender.js';
import MENUS from './Menu.js';

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
    if (this.#date >= 25) {
      return 0;
    }
    let discount = 1000;
    for (let i = 1; i < this.#date; i++) {
      discount += 100;
    }
    this.#discountContents['크리스마스 디데이 할인'] = discount;
    return discount;
  }
  specialDiscount() {
    const discount = 1000;
    if (this.#calender.getSpecialDay().includes(this.#date)) {
      this.#discountContents['특별 할인'] = discount;
      return discount;
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
    const discount = 2023 * count;
    if (this.#calender.getWeekday().includes(this.#date)) {
      this.#discountContents['평일 할인'] = discount;
      return discount;
    }
    return 0;
  }
  #weekendDiscount(count) {
    const discount = 2023 * count;
    if (this.#calender.getWeekend().includes(this.#date)) {
      this.#discountContents['주말 할인'] = discount;
      return discount;
    }
    return 0;
  }

  getDiscountContents() {
    if (Object.keys(this.#discountContents).length === 0) {
      return '없음';
    }

    return this.#discountContents;
  }
}

export default EventDiscount;
