### cssModule plugin

npm i babel-plugin-react-css-module

### feature

> see test/fixtures for realtime output

- [x] base

```jsx
// source
import './a.less';

<div className="home" onClick={() => null} />;
<div className="ho-me base" />;
<div className={x} />;
<div className={'home' + ' base c            xy' + ' ddd'} />;
<div className={'home'} />;
<div className={'home' + '-base' + x} />;
<div className={x('home')} />;

// dist
import _styles from './a.less';
import _rcm_style_fn from 'babel-plugin-react-css-module/lib/runtime';

var _rcm_style = _rcm_style_fn([_styles]);

<div className={_rcm_style('home')} onClick={() => null} />;
<div className={_rcm_style('ho-me base')} />;
<div className={_rcm_style(x)} />;
<div className={_rcm_style('home' + ' base c            xy' + ' ddd')} />;
<div className={_rcm_style('home')} />;
<div className={_rcm_style('home' + '-base' + x)} />;
<div className={_rcm_style(x('home'))} />;
```

- [x] multi

```jsx
// source
import './a.less';
import './b.less';

<div className="home" onClick={() => null} />;

// dist
import _styles from './a.less';
import _styles2 from './b.less';
import _rcm_style_fn from 'babel-plugin-react-css-module/lib/runtime';

var _rcm_style = _rcm_style_fn([_styles, _styles2]);

<div className={_rcm_style('home')} onClick={() => null} />;
```

- [x] nostyle

```jsx
// source
<div className="home" onClick={() => null} />;

// dist
<div className="home" onClick={() => null} />;
```
