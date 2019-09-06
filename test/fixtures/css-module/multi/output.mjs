import _styles from './a.less';
import _styles2 from './b.less';

function _rcm_style_fn(modules) {
  modules = modules || [];
  var a = {};
  modules.forEach(function (i) {
    if (i) {
      a = Object.assign(a, i);
    }
  });

  function h(k) {
    return a[k] || k;
  }

  return function (str) {
    return str.replace(/ +/g, ' ').trim().split(' ').reduce(function (c, i) {
      if (!c) {
        c += h(i);
      } else {
        c += ' ' + h(i);
      }

      return c;
    }, null);
  };
}

var _rcm_style = _rcm_style_fn([_styles, _styles2]);

<div className={_rcm_style("home")} onClick={() => null} />;
