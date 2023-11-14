import { MissionUtils } from '@woowacourse/mission-utils';
import EventStandard from '../const/EventStandard.js';
import EventText from '../const/EventText.js';

const OutputView = {
  printMenu(menus) {
    MissionUtils.Console.print(`<${EventText.eventContents.orderMenu}>`);
    for (const [menu, count] of menus) {
      MissionUtils.Console.print(`${menu} ${count}개`);
    }
  },
  printIntroduce() {
    MissionUtils.Console.print(
      `안녕하세요! 우테코 식당 ${EventStandard.eventMonth.month}월 이벤트 플래너입니다.`,
    );
  },
  printEventMessage(day) {
    MissionUtils.Console.print(
      `${EventStandard.eventMonth.month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
    );
  },
  printTotal(totalAmount) {
    MissionUtils.Console.print(`<${EventText.eventContents.totalPrice}>`);
    MissionUtils.Console.print(`${totalAmount.toLocaleString()}원`);
  },
  printBonusMenu(BonusMenu) {
    MissionUtils.Console.print(`<${EventText.eventContents.bonus}>`);
    if (BonusMenu === EventText.notThing.none) {
      MissionUtils.Console.print(`${BonusMenu}`);
      return;
    }
    MissionUtils.Console.print(`${BonusMenu} ${BonusMenu.split(',').length}개`);
  },
  printBenefit(benefit) {
    MissionUtils.Console.print(`<${EventText.eventContents.benefitContents}>`);
    if (benefit === EventText.notThing.none) {
      MissionUtils.Console.print(`${benefit}`);
      return;
    }
    for (const event in benefit) {
      MissionUtils.Console.print(`${event}: ${(benefit[event] * -1).toLocaleString()}원`);
    }
  },
  printTotalBenefit(benefitAmount) {
    MissionUtils.Console.print(`<${EventText.eventContents.totalBenefit}>`);
    MissionUtils.Console.print(
      `${(benefitAmount === 0 ? benefitAmount : benefitAmount * -1).toLocaleString()}원`,
    );
  },
  printBill(pay) {
    MissionUtils.Console.print(`<${EventText.eventContents.bill}>`);
    MissionUtils.Console.print(`${pay.toLocaleString()}원`);
  },
  printBadge(badge) {
    MissionUtils.Console.print(
      `<${EventStandard.eventMonth.month}월 ${EventText.eventContents.badge}>`,
    );
    MissionUtils.Console.print(badge);
  },
};

export default OutputView;
