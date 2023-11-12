import MENUS from './Menu.js';

class BeforeTheDiscount {
  #amount;
  constructor(menus) {
    this.#amount = 0;
    this.#searchMenu(menus);
  }

  #searchMenu(menus) {
    for (const [menu, count] of menus) {
      this.#priceSum(menu, count);
    }
  }

  #priceSum(menu, count) {
    for (const category in MENUS) {
      if (MENUS[category][menu]) {
        this.#amount += MENUS[category][menu] * count;
      }
    }
  }

  getTotalAmount() {
    return this.#amount;
  }
}

export default BeforeTheDiscount;
