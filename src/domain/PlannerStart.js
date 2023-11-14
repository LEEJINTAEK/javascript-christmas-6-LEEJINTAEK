import InputView from '../UI/InputView.js';
import OutputView from '../UI/OutputView.js';
import BeforeTheDiscount from './BeforeTheDiscount.js';
import EventConditionController from './eventCondition.js';
import EventController from './EventController.js';
import EventText from '../const/EventText.js';
import MENUS from '../const/Menu.js';

class Planner {
  #getBenefitContents;

  async start() {
    OutputView.printIntroduce();
    const inputDate = await InputView.readDate(); //int
    const inputMenu = await InputView.readMenu(); //array(2차원)
    OutputView.printEventMessage(inputDate);

    this.#contants(inputDate, inputMenu);
  }

  #contants(date, menus) {
    OutputView.printMenu(menus); //주문 내역
    const totalAmount = this.#getTotalAmount(menus);
    OutputView.printTotal(totalAmount); //할인 전 총금액(int)
    this.#eventController(totalAmount, date, menus);
  }
  #getTotalAmount(menus) {
    const beforeTheDiscount = new BeforeTheDiscount(menus);
    return beforeTheDiscount.getTotalAmount();
  }
  #eventController(totalAmount, date, menus) {
    const eventOuccr = new EventConditionController(totalAmount).getEventMode();
    this.#getBenefitContents = new EventController(
      totalAmount,
      eventOuccr,
      date,
      menus,
    ).getEventBenefit(); //객체
    this.#printContents(totalAmount);
  }
  #printContents(totalAmount) {
    OutputView.printBonusMenu(this.#getBenefitContents[EventText.eventContents.bonus]);
    OutputView.printBenefit(this.#getBenefitContents[EventText.eventContents.benefitContents]);
    OutputView.printTotalBenefit(this.#getBenefitContents[EventText.eventContents.totalBenefit]);
    OutputView.printBill(
      totalAmount -
        this.#getBenefitContents[EventText.eventContents.totalBenefit] +
        this.#getBenefitContents[EventText.eventContents.bill], //보너스 메뉴 받은 것 상쇄
    );
    OutputView.printBadge(this.#getBenefitContents[EventText.eventContents.badge]);
  }
}

export default Planner;
