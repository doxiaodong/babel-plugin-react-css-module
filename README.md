### cssModule plugin

npm i babel-plugin-react-css-module

### why

we love cssModule, but it's annoying for `styles.aaa` or `styles['aaa']`.
this plugin help convert `'aaa'` to `styles('aaa')`

before:

```
import styles from './index.less';

<div className={styles.a} />
<div className={`${styles.a} ${styles.b}`} />
```

after:

```
import './index.less';

<div className="a" />
<div className="a b" />
```

### cases

- multi styles with try last firstly

```
import 'a.less';
import 'b.less';

<div className="a" />

// cssModule

import styles1 from 'a.less';
import styles2 from 'b.less';

<div className={styles2.a || styles1.a || ''} />
```

### feature

> see test/fixtures for complete output

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
