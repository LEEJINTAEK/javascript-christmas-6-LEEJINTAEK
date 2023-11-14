import InputView from '../UI/InputView.js';
import OutputView from '../UI/OutputView.js';
import BeforeTheDiscount from './BeforeTheDiscount.js';
import EventConditionController from './eventCondition.js';
import EventController from './EventController.js';
import EventText from '../const/EventText.js';
import MENUS from '../const/Menu.js';

class PlannerStart {
  #getBenefitContents;

  async start() {
    OutputView.printIntroduce();
    const inputDate = await InputView.readDate(); //int
    const inputMenu = await InputView.readMenu(); //array(2차원)
    OutputView.printEventMessage(inputDate);

    this.#contants(inputDate, inputMenu);
  }

  #contants(date, menus) {
    OutputView.printMenu(menus); //주문 내역 출력
    const totalAmount = this.#getTotalAmount(menus);
    OutputView.printTotal(totalAmount); //할인 전 총금액(int) 출력
    this.#eventController(totalAmount, date, menus);
  }

  #getTotalAmount(menus) {
    // 혜택 전 총금액
    const beforeTheDiscount = new BeforeTheDiscount(menus);

    return beforeTheDiscount.getTotalAmount();
  }

  #eventController(totalAmount, date, menus) {
    //이벤트 조건 발생
    const isEventOuccr = new EventConditionController(totalAmount).getEventMode();
    //주문에 따른 이벤트 내역
    this.#getBenefitContents = new EventController(
      totalAmount,
      isEventOuccr,
      date,
      menus,
    ).getEventBenefit(); //객체
    this.#printContents(totalAmount);
  }
  //플래너 내역 출력
  #printContents(totalAmount) {
    OutputView.printBonusMenu(this.#getBenefitContents[EventText.eventContents.bonus]); //증정 메뉴
    OutputView.printBenefit(this.#getBenefitContents[EventText.eventContents.benefitContents]); //혜택 내용
    OutputView.printTotalBenefit(this.#getBenefitContents[EventText.eventContents.totalBenefit]); //총혜택금액
    OutputView.printBill(
      //할인 후 예상 금액
      totalAmount -
        this.#getBenefitContents[EventText.eventContents.totalBenefit] +
        this.#getBenefitContents[EventText.eventContents.bill], //보너스 메뉴 받은 것 상쇄
    );
    OutputView.printBadge(this.#getBenefitContents[EventText.eventContents.badge]); //이벤트 배지
  }
}

export default PlannerStart;
