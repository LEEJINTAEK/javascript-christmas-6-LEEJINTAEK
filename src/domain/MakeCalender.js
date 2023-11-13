class Calender {
  #days;
  constructor() {
    this.#days = {
      weekend: [],
      weekday: [],
      specialDay: [25],
    };
    this.makeCalendar();
  }

  makeCalendar() {
    let date = new Date();

    let firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 2);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 1);

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      this.division(d);
    }
  }

  division(d) {
    switch (d.getDay()) {
      case 0:
      case 6:
        this.#days.weekend.push(Number(d.toISOString().slice(8, 10)));
        break;
      case 1:
        this.#days.specialDay.push(Number(d.toISOString().slice(8, 10)));
      default:
        this.#days.weekday.push(Number(d.toISOString().slice(8, 10)));
        break;
    }
  }

  getWeekend() {
    return this.#days.weekend;
  }
  getWeekday() {
    return this.#days.weekday;
  }
  getSpecialDay() {
    return this.#days.specialDay;
  }
}

export default Calender;
