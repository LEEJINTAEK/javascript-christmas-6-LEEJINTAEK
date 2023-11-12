import { MissionUtils } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(menuMap) {
    MissionUtils.Console.print('<주문 메뉴>');
    for (const [menu, count] of menuMap) {
      MissionUtils.Console.print(`${menu} ${count}개`);
    }
  },
  printIntroduce() {
    MissionUtils.Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },
  printEventMessage(day) {
    MissionUtils.Console.print(`12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },
  printTotal(pay) {
    MissionUtils.Console.print('<할인 전 총주문 금액>');
    MissionUtils.Console.print(pay.toLocaleString());
  },
  printGiftMenu(giftMenu) {
    MissionUtils.Console.print('<증정 메뉴>');
    MissionUtils.Console.print(giftMenu);
  },
  printBenefit(dictBenefit) {
    MissionUtils.Console.print('<혜택 내역>');
    for (const [event, sale] of Object.entries(dictBenefit)) {
      if (sale > 0) {
        MissionUtils.Console.print(`${event}: ${(sale * -1).toLocaleString()}원`);
      }
    }
  },
  printTotalBenefit(benefitAmount) {
    MissionUtils.Console.print('<총혜택 금액>');
    MissionUtils.Console.print((benefitAmount * -1).toLocaleString());
  },
  printBill(pay) {
    MissionUtils.Console.print('<할인 후 예상 결제 금액>');
    MissionUtils.Console.print(pay.toLocaleString());
  },
  printBadge(badge) {
    MissionUtils.Console.print('<12월 이벤트 배지>');
    MissionUtils.Console.print(badge);
  },
};

export default OutputView;
