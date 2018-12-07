export class Cache {
  private _style = '';

  getStyles() {
    return this._style;
  }

  setStyles(style) {
    this._style = style;
  }

  clear() {
    this._style = '';
  }
}

export default new Cache();
