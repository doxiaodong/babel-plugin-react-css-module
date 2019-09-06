export const cssModuleFnName = '_rcm_style_fn';
export const cssVar = '_rcm_style';

export class Cache {
  private _styles = [];

  getStyles() {
    return this._styles;
  }

  setStyles(style) {
    this._styles.push(style);
  }

  clear() {
    this._styles = [];
  }
}

export default new Cache();
