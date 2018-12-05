import { declare } from '@babel/helper-plugin-utils';
import { types as t, PluginObj } from '@babel/core';

export default declare((api, options, dirname) => {
  api.assertVersion(7);

  return {
    name: 'react-css-module',
    visitor: {}
  } as PluginObj;
});
