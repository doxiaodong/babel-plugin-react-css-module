### cssModule plugin

### feature

> see test/fixtures for realtime output

- [x] base

```jsx
// source
import React from 'react';
import './a.less';
<div className="home" onClick={() => null} />;
<div className="ho-me base" />;

// dist
import React from 'react';
import styles from './a.less';
<div className={styles['home']} onClick={() => null} />;
<div className={styles['ho-me'] + ' ' + styles['base']} />;
```

- [x] StringLiteral

```jsx
// source
<div className={'home'} />;

// dist
<div className={styles['home']} />;
```

- [x] BinaryExpression

```jsx
// source
<div className={'home' + ' base' + x} />

// dist
<div className={styles['home'] + ' ' + styles[' base'] + x} />;
```

- [ ] template

```jsx
// source
<div className={`home ${x}`} />

// dist
<div className={`${styles['home']} ${x}`} />
```

- [ ] ref

```jsx
// source
const home = classnames('home')
<div className={home} />

// dist
const home = classnames(styles['home'])
<div className={home} />
```

### BUG

- [ ] BinaryExpression without blank

```jsx
// source
<div className={'home' + '-base'} />;

// dist
<div className={styles['home'] + ' ' + styles['-base']} />;

// should
<div className={styles['home-base']} />;
```
