import ReadDate from '../src/validate/ReadDate.js';

describe('ReadDate의 예외 테스트', () => {
  test('숫자가 아닐 때 에러가 발생한다.', () => {
    expect(() => {
      new ReadDate('abc');
    }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  });

  test('1~31 아닐 때 에러가 발생한다.', () => {
    expect(() => {
      new ReadDate('0');
    }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');

    expect(() => {
      new ReadDate('32');
    }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  });

  test('정상적인 입력일 때 에러가 발생하지 않는다.', () => {
    expect(() => {
      new ReadDate('15');
    }).not.toThrow();
  });
});
