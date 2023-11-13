//총주문 금액 10,000원 이상부터 이벤트 적용

class EventConditionController {
  #eventOccur;
  constructor(totalAmount) {
    this.#eventOccur = false;
    this.#occurController(totalAmount);
  }
  #occurController(totalAmount) {
    if (totalAmount >= 10000) {
      this.#eventOccur = true;
    }
  }

  getEventMode() {
    return this.#eventOccur;
  }
}

export default EventConditionController;
