import ReadDate from '../src/validate/ReadDate.js';
import EVENT_ERROR from '../src/const/EventError.js';

describe('ReadDate의 예외 테스트', () => {
  const DATE_ERROR_MESSAGE = EVENT_ERROR.dateError;

  test('숫자가 아닐 때 에러가 발생한다.', () => {
    expect(() => {
      new ReadDate('abc');
    }).toThrow(DATE_ERROR_MESSAGE);
  });

  test.each(['0', '32'])('1~31 아닐 때 에러가 발생한다.', (input) => {
    expect(() => {
      new ReadDate(input);
    }).toThrow(DATE_ERROR_MESSAGE);
  });

  test('정상적인 입력일 때 에러가 발생하지 않는다.', () => {
    expect(() => {
      new ReadDate('15');
    }).not.toThrow();
  });
});
