import { Visitor, types as t } from '@babel/core';
import cache from '../cache';
import { NodePath } from '@babel/traverse';

class ClassNamePlugin {
  private _node: t.JSXAttribute;
  constructor(private _path: NodePath<t.JSXAttribute>) {
    this._node = _path.node;
    this.StringLiteral();
    this.JSXExpressionContainer();
  }

  // TODO: 确定具体的 Expression
  private _getExpressionByStringLiteral(value: string): t.Expression {
    const styles = cache.getStyles();
    const expression = value
      .replace(/ +/g, ' ')
      .trim()
      .split(' ')
      .reduce((pre: any, i) => {
        if (!pre) {
          pre = t.memberExpression(
            t.identifier(styles),
            t.stringLiteral(i),
            true,
          );
        } else {
          pre = t.binaryExpression('+', pre, t.stringLiteral(' '));
          pre = t.binaryExpression(
            '+',
            pre,
            t.memberExpression(t.identifier(styles), t.stringLiteral(i), true),
          );
        }
        return pre;
      }, null);

    return expression;
  }
  private _replaceStringLiteral(value: string) {
    this._path.replaceWith(
      t.jsxAttribute(
        t.jsxIdentifier('className'),
        t.jsxExpressionContainer(this._getExpressionByStringLiteral(value)),
      ),
    );
  }

  // className="home base"
  StringLiteral() {
    if (t.isStringLiteral(this._node.value)) {
      this._replaceStringLiteral(this._node.value.value);
    }
  }

  private _doBinaryExpression(expression: t.BinaryExpression) {
    const { left, right, operator } = expression;
    if (operator !== '+') {
      return;
    }

    // TODO: 把 left, right 合并
    if (t.isStringLiteral(left) && left.value.trim() !== '') {
      // TODO: 有其他方法更新？
      expression.left = this._getExpressionByStringLiteral(left.value);
    }
    if (t.isBinaryExpression(left)) {
      this._doBinaryExpression(left);
    }

    if (t.isStringLiteral(right) && right.value.trim() !== '') {
      expression.right = t.binaryExpression(
        '+',
        // right 需要补一个空格, left 不需要
        t.stringLiteral(' '),
        this._getExpressionByStringLiteral(right.value),
      );
    }
    if (t.isBinaryExpression(right)) {
      this._doBinaryExpression(right);
    }
  }
  JSXExpressionContainer() {
    if (t.isJSXExpressionContainer(this._node.value)) {
      if (t.isStringLiteral(this._node.value.expression)) {
        // className={'home base'}
        this._replaceStringLiteral(this._node.value.expression.value);
      } else if (t.isBinaryExpression(this._node.value.expression)) {
        // className={'home' + ' base'}
        this._doBinaryExpression(this._node.value.expression);
      }
    }
  }
}

export default {
  JSXAttribute(path) {
    const { node } = path;

    if (node.name.name === 'className') {
      new ClassNamePlugin(path);
    }
  },
} as Visitor;
