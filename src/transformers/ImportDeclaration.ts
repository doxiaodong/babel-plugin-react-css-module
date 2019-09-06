import { Visitor, types as t, template } from '@babel/core';
import cache, { cssModuleFnName, cssVar } from '../cache';

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

  Program: {
    exit(path) {
      const firstNonImportDeclarationNode = path.get('body').find(node => {
        return !t.isImportDeclaration(node);
      });

      if (firstNonImportDeclarationNode && cache.getStyles().length > 0) {
        firstNonImportDeclarationNode.insertBefore(
          template.statements(`
            import ${cssModuleFnName} from 'babel-plugin-react-css-module/lib/runtime';

            var ${cssVar} = ${cssModuleFnName}([${cache.getStyles()}]);
          `)(),
        );
      }
    },
  },
} as Visitor;
