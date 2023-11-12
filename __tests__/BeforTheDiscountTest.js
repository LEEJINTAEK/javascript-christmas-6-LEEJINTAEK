import BeforeTheDiscount from '../src/domain/BeforeTheDiscount.js';
import MENUS from '../src/domain/Menu.js';

describe('BeforeTheDiscount', () => {
  it('현재 메뉴', () => {
    const menus = [
      ['해산물파스타', 2],
      ['레드와인', 1],
      ['초코케이크', 1],
    ];

    const beforeTheDiscount = new BeforeTheDiscount(menus);
    const totalAmount = beforeTheDiscount.getTotalAmount();

    let expectedAmount = 0;
    for (const [menu, count] of menus) {
      for (const category in MENUS) {
        if (MENUS[category][menu]) {
          expectedAmount += MENUS[category][menu] * count;
        }
      }
    }

    expect(totalAmount).toEqual(expectedAmount);
  });
});
