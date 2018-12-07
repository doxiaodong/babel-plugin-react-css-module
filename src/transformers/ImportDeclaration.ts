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

    // TODO: 缓存 styles，替换后判断是否是已处理过的样式
    // 后续替换 className 的时候需要用到这个 styles
    if (!isSpecifiersImport(node) && isStyleModule(node)) {
      const styles = path.scope.generateUidIdentifier('styles');
      cache.setStyles(styles.name);
      path.replaceWith(
        t.importDeclaration([t.importDefaultSpecifier(styles)], node.source)
      );
    }
  }
} as Visitor;
