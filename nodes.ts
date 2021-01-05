import { BinaryOp, UnaryOp } from './token.ts';

export default abstract class Node {
  abstract toString(): string;
}

export class NumberNode implements Node {
  constructor(public value: number) {}

  toString() {
    return this.value.toString();
  }
}

export class UnaryOpNode implements Node {
  constructor(public node: Node, public operator: UnaryOp) {}

  toString() {
    return `(${this.operator}${this.node})`;
  }
}

export class BinaryOpNode implements Node {
  constructor(
    public left: Node,
    public operator: BinaryOp,
    public right: Node
  ) {}

  toString() {
    return `(${this.left} ${this.operator} ${this.right})`;
  }
}