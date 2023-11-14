import MENUS from '../domain/Menu.js';
import EventError from '../const/EventError.js';
import EventStandard from '../const/EventStandard.js';

const MENU_ERROR_MESSAGE = EventError.menuError;

class ReadMenu {
  //menus->2차원배열
  constructor(menus) {
    this.#validate(menus);
    this.#duplicateAndCounting(menus);
  }

  #validate(menus) {
    for (const menu of menus) {
      //입력 형식에 맞지 않을 때, 메뉴 개수가 1미만일 때
      if (menu.length !== 2 || Number(menu[1]) < 1) {
        throw new Error(MENU_ERROR_MESSAGE);
      }
      //메뉴가 없을 때
      this.#notOnTheMenuAndDrink(menu[0]);
    }
  }

  //중복체크 및 개수 체크
  #duplicateAndCounting(menus) {
    const menuCheck = [];
    let menuCount = 0;
    for (const [menu, count] of menus) {
      if (menuCheck.includes(menu)) {
        throw new Error(MENU_ERROR_MESSAGE);
      }
      menuCheck.push(menu);
      menuCount += Number(count);
    }
    if (menuCount > EventStandard.menuCount.count) {
      throw new Error(MENU_ERROR_MESSAGE);
    }
  }

  //메뉴가 없을 때 및 음료만 시킬 때
  #notOnTheMenuAndDrink(menu) {
    const anotherMenus = new Set(); //음료만 시키는지 검사
    let find = false;
    for (const category in MENUS) {
      if (MENUS[category][menu]) {
        find = true;
        anotherMenus.add(category);
      }
    }
    if (!find) {
      throw new Error(MENU_ERROR_MESSAGE);
    }
    if (anotherMenus.size === 1 && anotherMenus.has(EventStandard.dontOrder.menu)) {
      throw new Error(MENU_ERROR_MESSAGE);
    }
  }
}

export default ReadMenu;
