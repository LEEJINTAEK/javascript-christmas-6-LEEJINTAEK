import BeforeTheDiscount from '../src/domain/BeforeTheDiscount.js';
import MENUS from '../src/domain/Menu.js';

describe('BeforeTheDiscount', () => {
  test('현재 메뉴', () => {
    const menus = [
      ['해산물파스타', 2],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];

    const beforeTheDiscount = new BeforeTheDiscount(menus);
    const totalAmount = beforeTheDiscount.getTotalAmount();

    expect(totalAmount).toEqual(145000);
  });
});
