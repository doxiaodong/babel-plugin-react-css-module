import _styles from './a.less';
import _styles2 from './b.less';
import _rcm_style_fn from 'babel-plugin-react-css-module/lib/runtime';

var _rcm_style = _rcm_style_fn([_styles, _styles2]);

<div className={_rcm_style("home")} onClick={() => null} />;
