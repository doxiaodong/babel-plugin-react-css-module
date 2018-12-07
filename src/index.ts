import { declare } from '@babel/helper-plugin-utils';
import { types as t, PluginObj } from '@babel/core';
import jsx from '@babel/plugin-syntax-jsx';

import ImportDeclarationVisitor from './transformers/ImportDeclaration';
import JSXAttributeVisitor from './transformers/JSXAttribute';
import cache from './cache';

export default declare((api, options, dirname) => {
  api.assertVersion(7);
  return {
    name: 'react-css-module',
    inherits: jsx,
    pre() {},
    visitor: {
      ...ImportDeclarationVisitor,
      ...JSXAttributeVisitor
    },
    post() {
      cache.clear();
    }
  } as PluginObj;
});
