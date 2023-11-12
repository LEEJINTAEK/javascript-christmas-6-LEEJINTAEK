import MENUS from '../domain/Menu.js';

const MENU_ERROR_MESSAGE = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';
const COUNT_ERROR_MESSAGE = '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.';
const DRINK_ERROR_MESSAGE = '[ERROR] 음료만 주문 시, 주문할 수 없습니다.';

class ReadMenu {
  #anotherMenus = new Set(); //음료만 시키는지 검사
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
    if (menuCount > 20) {
      throw new Error(COUNT_ERROR_MESSAGE);
    }
  }

  //메뉴가 없을 때 및 음료만 시킬 때
  #notOnTheMenuAndDrink(menu) {
    let find = false;
    for (const category in MENUS) {
      if (MENUS[category][menu]) {
        find = true;
        this.#anotherMenus.add(category);
      }
    }
    if (!find) {
      throw new Error(MENU_ERROR_MESSAGE);
    }
    if (this.#anotherMenus.size === 1 && this.#anotherMenus.has('DRINK')) {
      throw new Error(DRINK_ERROR_MESSAGE);
    }
  }
}

export default ReadMenu;
