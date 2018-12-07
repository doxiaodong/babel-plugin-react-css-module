import _styles from './a.less';
<div className={_styles["home"] + (" " + (_styles["base"] + " " + _styles["c"] + " " + _styles["xy"])) + (" " + _styles["ddd"])} />; // TODO: 下边这种需要计算结果的先把字符串拼接好，然后再处理

<div className={_styles["home"] + (" " + _styles["-base"]) + x} />;
