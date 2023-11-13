import ReadMenu from '../src/validate/ReadMenu.js';

describe('ReadMenu의 예외 테스트', () => {
  const convert = (input) => {
    return input.split(',').map((menu) => menu.split('-'));
  };
  const MENU_ERROR_MESSAGE = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

  test('입력이 형식에 맞지 않을 때 에러가 발생한다 ', () => {
    expect(() => {
      new ReadMenu(convert('양송이수프--1'));
    }).toThrow(MENU_ERROR_MESSAGE);
  });

  test('개수가 1 이상이 아닐 때 에러가 발생한다', () => {
    expect(() => {
      new ReadMenu(convert('양송이수프-0'));
    }).toThrow(MENU_ERROR_MESSAGE);
  });

  test('없는 메뉴일 때 에러가 발생한다', () => {
    expect(() => {
      new ReadMenu(convert('없는메뉴-1'));
    }).toThrow(MENU_ERROR_MESSAGE);
  });

  test('중복 메뉴일 때 에러가 발생한다', () => {
    expect(() => {
      new ReadMenu(convert('양송이수프-1,양송이수프-1'));
    }).toThrow(MENU_ERROR_MESSAGE);
  });

  test('메뉴의 개수가 20개를 초과할 때 에러가 발생한다', () => {
    expect(() => {
      new ReadMenu(convert('양송이수프-21'));
    }).toThrow(MENU_ERROR_MESSAGE);
  });

  test('음료만 주문할 때 에러가 발생한다', () => {
    expect(() => {
      new ReadMenu(convert('레드와인-1'));
    }).toThrow(MENU_ERROR_MESSAGE);
  });

  test('정상적인 입력일 때 에러가 발생하지 않는다', () => {
    expect(() => {
      new ReadMenu(convert('양송이수프-1,레드와인-1,해산물파스타-1'));
    }).not.toThrow();
  });
});
