class ReadDate {
  constructor(date) {
    this.#validate(date);
  }
  // 1~31 숫자가 아닐 때 처리
  #validate(date) {
    if (isNaN(date) || (date >= 1 && date <= 31)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }
}

export default ReadDate;
