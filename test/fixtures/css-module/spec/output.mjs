import _styles from './a.less';
import _rcm_style_fn from 'babel-plugin-react-css-module/lib/runtime';

var _rcm_style = _rcm_style_fn([_styles]);

<div className={_rcm_style("home")} onClick={() => null} />;
<div className={_rcm_style("ho-me base")} />;
<div className={_rcm_style(x)} />;
<div className={_rcm_style('home' + ' base c            xy' + ' ddd')} />;
<div className={_rcm_style('home')} />;
<div className={_rcm_style('home' + '-base' + x)} />;
<div className={_rcm_style(x('home'))} />;
