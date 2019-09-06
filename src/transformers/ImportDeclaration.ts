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

      if (firstNonImportDeclarationNode) {
        firstNonImportDeclarationNode.insertBefore(
          template.statements(`
            function ${cssModuleFnName}(modules) {
              modules = modules || [];
              var a = {};
              modules.forEach(function(i) {
                if (i) {
                  a = Object.assign(a, i);
                }
              });

              function h(k) {
                return a[k] || k;
              }
              return function(str) {
                return str.replace(/ +/g, ' ').trim().split(' ')
                .reduce(function(c, i) {
                  if (!c) {
                    c += h(i);
                  } else {
                    c += ' ' + h(i);
                  }
                  return c;
                }, null);
              }
            }
            var ${cssVar} = ${cssModuleFnName}([${cache.getStyles()}]);
          `)(),
        );
      }
    },
  },
} as Visitor;
