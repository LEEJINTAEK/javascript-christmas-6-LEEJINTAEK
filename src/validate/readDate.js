import EventError from '../const/EventError.js';
import EventStandard from '../const/EventStandard.js';

class ReadDate {
  constructor(date) {
    this.#validate(Number(date));
  }
  // 1~31 숫자가 아닐 때 처리
  #validate(date) {
    if (
      isNaN(date) ||
      date < EventStandard.eventDay.startDay ||
      date > EventStandard.eventDay.endDay
    ) {
      throw new Error(EventError.dateError);
    }
  }
}

export default ReadDate;
