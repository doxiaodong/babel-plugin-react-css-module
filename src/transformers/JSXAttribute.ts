import { Visitor, types as t } from '@babel/core';
import { cssVar } from '../cache';
import { NodePath } from '@babel/traverse';

class ClassNamePlugin {
  private _node: t.JSXAttribute;
  constructor(private _path: NodePath<t.JSXAttribute>) {
    this._node = _path.node;
    this.StringLiteral();
    this.JSXExpressionContainer();
  }

  private _getExpression(value: any): t.Expression {
    return t.callExpression(t.identifier(cssVar), [value]);
  }
  private _replaceExpression(value: any) {
    this._path.replaceWith(
      t.jsxAttribute(
        t.jsxIdentifier('className'),
        t.jsxExpressionContainer(this._getExpression(value)),
      ),
    );
  }

  StringLiteral() {
    if (t.isStringLiteral(this._node.value)) {
      this._replaceExpression(this._node.value);
    }
  }

  JSXExpressionContainer() {
    if (t.isJSXExpressionContainer(this._node.value)) {
      if (!t.isCallExpression(this._node.value.expression)) {
        this._replaceExpression(this._node.value.expression);
      } else {
        if (t.isIdentifier(this._node.value.expression.callee)) {
          if (this._node.value.expression.callee.name !== cssVar) {
            this._replaceExpression(this._node.value.expression);
          }
        }
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
