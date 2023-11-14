import EventStandard from '../const/EventStandard.js';

class EventConditionController {
  #isEventOccur;
  constructor(totalAmount) {
    this.#isEventOccur = false;
    this.#occurController(totalAmount);
  }
  #occurController(totalAmount) {
    if (totalAmount >= EventStandard.occurStandard.price) {
      this.#isEventOccur = true;
    }
  }

  getEventMode() {
    return this.#isEventOccur;
  }
}

export default EventConditionController;
