import EVENT_STANDARD from '../const/EventStandard.js';

//이벤트 조건 발생
class EventConditionController {
  #isEventOccur;
  constructor(totalAmount) {
    this.#isEventOccur = false;
    this.#occurController(totalAmount);
  }
  #occurController(totalAmount) {
    if (totalAmount >= EVENT_STANDARD.occurStandard.price) {
      this.#isEventOccur = true;
    }
  }

  getEventMode() {
    return this.#isEventOccur;
  }
}

export default EventConditionController;
