export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  DIVIDE = '/',
  MULTIPLY = '*',
}

export class Calculator {
  private _expression: (string | number)[] = [];

  append(num: number): void {
    this._expression.push(num);
  }

  add(num: number): void {
    this.handleMissingLeftHand();

    this._expression.push(Operator.ADD, num);
  }

  subtract(num: number): void {
    this.handleMissingLeftHand();

    this._expression.push(Operator.SUBTRACT, num);
  }

  divide(num: number): void {
    this.handleMissingLeftHand();

    this._expression.push(Operator.DIVIDE, num);
  }

  multiply(num: number): void {
    this.handleMissingLeftHand();

    this._expression.push(Operator.MULTIPLY, num);
  }

  reset() {
    this._expression = [];
  }

  private handleMissingLeftHand(): void {
    if (typeof this._expression[this.expression.length - 1] !== 'number') {
      this._expression.push(0);
    }
  }

  get expression(): string {
    return this._expression.join(' ');
  }

  get result(): number {
    return eval(this.expression);
  }
}
