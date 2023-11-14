import EventStandard from '../const/EventStandard.js';

class EventConditionController {
  #eventOccur;
  constructor(totalAmount) {
    this.#eventOccur = false;
    this.#occurController(totalAmount);
  }
  #occurController(totalAmount) {
    if (totalAmount >= EventStandard.occurStandard.price) {
      this.#eventOccur = true;
    }
  }

  getEventMode() {
    return this.#eventOccur;
  }
}

export default EventConditionController;
