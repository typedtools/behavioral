export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  DIVIDE = '/',
  MULTIPLY = '*',
}

export class Calculator {
  private _expression: (string | number)[] = [0];

  append(part: number | Operator): void {
    if (typeof part === 'number') {
      if (typeof this._expression[this._expression.length - 1] === 'number') {
        this._expression[this._expression.length - 1] = part;
      } else {
        this._expression.push(part);
      }
    } else {
      if (typeof this._expression[this._expression.length - 1] === 'string') {
        this._expression[this._expression.length - 1] = part;
      } else {
        this._expression.push(part);
      }
    }
  }

  reset() {
    this._expression = [];
  }

  get expression(): string {
    return this._expression.join(' ');
  }

  get result(): number {
    return eval(this.expression);
  }
}
