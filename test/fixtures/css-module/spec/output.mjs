import React from 'react';
import _styles from './a.less';
export default class extends React.Component {
  render() {
    <>
      <div className={_styles.home} onClick={() => null} />;
      <div className={_styles.home + " " + _styles.base} onClick={() => null} />;
    </>;
  }

}
