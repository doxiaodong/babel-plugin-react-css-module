import { Visitor, types as t } from '@babel/core';
import cache from '../cache';
import { NodePath } from '@babel/traverse';

function replaceStringLiteral(path: NodePath<t.JSXAttribute>, value) {
  const styles = cache.getStyles();
  const tmp = value
    .trim()
    .split(' ')
    .reduce((pre: any, i) => {
      if (!pre) {
        pre = t.memberExpression(t.identifier(styles), t.identifier(i));
      } else {
        pre = t.binaryExpression('+', pre, t.stringLiteral(' '));
        pre = t.binaryExpression(
          '+',
          pre,
          t.memberExpression(t.identifier(styles), t.identifier(i))
        );
      }
      return pre;
    }, null);

  path.replaceWith(
    t.jsxAttribute(t.jsxIdentifier('className'), t.jsxExpressionContainer(tmp))
  );
}

export default {
  JSXAttribute(path) {
    const { node } = path;

    if (node.name.name === 'className') {
      if (t.isStringLiteral(node.value)) {
        // className="home base"
        replaceStringLiteral(path, node.value.value);
      } else if (t.isJSXExpressionContainer(node.value)) {
        if (t.isStringLiteral(node.value.expression)) {
          // className={'home base'}
          replaceStringLiteral(path, node.value.expression.value);
        }
        // TODO: template
      }
    }
  }
} as Visitor;
