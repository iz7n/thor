import { rgb24 } from 'fmt/colors.ts';

import Value from './value.ts';

export default class Boolean extends Value {
  constructor(public value: boolean) {
    super();
  }

  toString(): string {
    return this.value.toString();
  }
  toPrint(): string {
    return rgb24(this.toString(), 0xffff00);
  }

  '=='(other: Value) {
    if (other instanceof Boolean)
      return new Boolean(this.value === other.value);
  }

  '!='(other: Value) {
    if (other instanceof Boolean)
      return new Boolean(this.value !== other.value);
  }

  not() {
    return new Boolean(!this.value);
  }

  and(other: Value) {
    if (other instanceof Boolean) return new Boolean(this.value && other.value);
  }

  or(other: Value) {
    if (other instanceof Boolean) return new Boolean(this.value || other.value);
  }

  xor(other: Value) {
    if (other instanceof Boolean)
      return new Boolean(this.value !== other.value);
  }

  nand(other: Value) {
    if (other instanceof Boolean)
      return new Boolean(!this.value && !other.value);
  }

  nor(other: Value) {
    if (other instanceof Boolean)
      return new Boolean(!this.value || !other.value);
  }
}
