### cssModule plugin

### feature

> see test/fixtures for realtime output

- [x] base

```jsx
import React from 'react';
import './a.less';
<div className="home" onClick={() => null} />;
<div className="ho-me base" />;

import React from 'react';
import styles from './a.less';
<div className={styles['home']} onClick={() => null} />;
<div className={styles['ho-me'] + ' ' + styles['base']} />;
```

- [x] StringLiteral

```jsx
<div className={'home'} />;
<div className={styles['home']} />;
```

- [x] BinaryExpression

```jsx
<div className={'home' + ' base' + x} />

<div className={styles['home'] + ' ' + styles[' base'] + x} />;
```

- [ ] template

```jsx
<div className={`home ${x}`} />

<div className={`${styles['home']} ${x}`} />
```

- [ ] ref

```jsx
const home = classnames('home')
<div className={home} />

const home = classnames(styles['home'])
<div className={home} />
```

### BUG

- [ ] BinaryExpression without blank

```jsx
<div className={'home' + '-base'} />;
<div className={styles['home'] + ' ' + styles['-base']} />;

// should be
<div className={styles['home-base']} />;
```
