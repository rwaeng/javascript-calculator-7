import { Console } from "@woowacourse/mission-utils";

class App {
  constructor() {
    this.separators = new RegExp(`[,:]`);
    this.userInput = "";
    this.numbers = [];
  }

  async getUserInput() {
    this.userInput = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요.\n"
    );
  }

  // 구분자 찾기 기능
  async getSeparator() {
    if (this.userInput.startsWith("//")) {
      // 구분자 획득
      this.separator = this.userInput[2];
      this.separators = new RegExp(new RegExp(`[,:${this.separator}]`));

      // 입력값에서 커스텀 구분자 관련 문자 제거
      const indexOfn = this.userInput.indexOf("n");
      this.userInput = this.userInput.slice(indexOfn + 1);
    }
  }

  // 문자별로 유효한 값인지 확인
  isValidChar(char) {
    return (
      this.separators.test(char) || (!isNaN(Number(char)) && Number(char) >= 0)
    );
  }

  // 입력한 문자열 유효성 검사
  async validateInput() {
    const chars = this.userInput.split(this.separators);

    for (const char of chars) {
      const isValid = this.isValidChar(char);

      // 유효하지 않으면 에러 발생
      if (!isValid) {
        const errorMsg = isNaN(Number(char))
          ? "[ERROR] 구분자가 아닌 문자는 입력할 수 없습니다."
          : "[ERROR] 음수는 입력할 수 없습니다.";
        throw new Error(errorMsg);
      }

      // 유효한 경우 숫자로 변환
      this.numbers.push(Number(char));
    }
  }

  // 합 계산
  calculateSum() {
    this.result = this.numbers.reduce((acc, num) => acc + Number(num), 0);
  }

  // 결과 출력
  printResult() {
    Console.print(`결과 : ${this.result}`);
  }

  async run() {
    try {
      await this.getUserInput();
      await this.getSeparator();
      await this.validateInput();
      this.calculateSum();
      this.printResult();
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default App;
