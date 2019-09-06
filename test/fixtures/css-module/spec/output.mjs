import _styles from './a.less';

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
        c = h(i);
      } else {
        c += ' ' + h(i);
      }

      return c;
    }, null);
  };
}

var _rcm_style = _rcm_style_fn([_styles]);

<div className={_rcm_style("home")} onClick={() => null} />;
<div className={_rcm_style("ho-me base")} />;
<div className={_rcm_style(x)} />;
<div className={_rcm_style('home' + ' base c            xy' + ' ddd')} />;
<div className={_rcm_style('home')} />;
<div className={_rcm_style('home' + '-base' + x)} />;
<div className={_rcm_style(x('home'))} />;
