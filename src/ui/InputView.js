import { MissionUtils } from '@woowacourse/mission-utils';
import ReadDate from '../validate/readDate';
import ReadMenu from '../validate/readMenu';
import EventStandard from '../const/EventStandard.js';

const InputView = {
  async readDate() {
    try {
      const input = await MissionUtils.Console.readLineAsync(
        `${EventStandard.eventMonth.month}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)`,
      );
      new ReadDate(input);

      return Number(input);
    } catch (error) {
      MissionUtils.Console.print(error.message);
      return await this.readDate();
    }
  },

  async readMenu() {
    try {
      const input = await MissionUtils.Console.readLineAsync(
        '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
      );
      const inputConvertArray = input.split(',').map((menu) => menu.split('-'));
      new ReadMenu(inputConvertArray);

      return inputConvertArray;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      return await this.readMenu();
    }
  },
};

export default InputView;
