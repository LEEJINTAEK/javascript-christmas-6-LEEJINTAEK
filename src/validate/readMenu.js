import MENUS from '../domain/Menu.js';

const MENU_ERROR_MESSAGE = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

class ReadMenu {
  //menus->2차원배열
  constructor(menus) {
    this.#validate(menus);
    this.#duplication(menus);
  }

  #validate(menus) {
    for (const menu of menus) {
      //입력 형식에 맞지 않을 때, 메뉴 개수가 1미만일 때
      if (menu.length !== 2 || Number(menu[1]) < 1) {
        throw new Error(MENU_ERROR_MESSAGE);
      }
      //메뉴가 없을 때
      this.#notOnTheMenu(menu[0]);
    }
  }

  //메뉴가 중복일 때
  #duplication(menus) {
    const menuCheck = [];
    for (const [menu, count] of menus) {
      if (menuCheck.includes(menu)) {
        throw new Error(MENU_ERROR_MESSAGE);
      }
      menuCheck.push(menu);
    }
  }

  //메뉴가 없을 때
  #notOnTheMenu(menu) {
    let found = false;
    for (const category in MENUS) {
      if (MENUS[category][menu]) {
        found = true;
      }
    }
    if (!found) {
      throw new Error(MENU_ERROR_MESSAGE);
    }
  }
}

export default ReadMenu;
