import { Visitor, types as t } from '@babel/core';
import cache from '../cache';

function isStyleModule(node) {
  // TODO: 可配置
  return /\.(less|css|sass|scss)/.test(node.source.value);
}

function isSpecifiersImport(node) {
  return node.specifiers.length > 0;
}

export default {
  ImportDeclaration(path, state) {
    const { node } = path;

    if (!isSpecifiersImport(node) && isStyleModule(node)) {
      const styles = path.scope.generateUidIdentifier('styles');
      cache.setStyles(styles.name);
      path.replaceWith(
        t.importDeclaration([t.importDefaultSpecifier(styles)], node.source),
      );
    }
  },
} as Visitor;
