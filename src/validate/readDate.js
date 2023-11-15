import EVENT_ERROR from '../const/EventError.js';
import EVENT_STANDARD from '../const/EventStandard.js';

class ReadDate {
  constructor(date) {
    this.#validate(Number(date));
  }
  // 1~31 숫자가 아닐 때 처리
  #validate(date) {
    if (
      isNaN(date) ||
      date < EVENT_STANDARD.eventDay.startDay ||
      date > EVENT_STANDARD.eventDay.endDay
    ) {
      throw new Error(EVENT_ERROR.dateError);
    }
  }
}

export default ReadDate;
