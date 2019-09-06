export default function(modules) {
  modules = modules || [];
  function h(k) {
    return modules.reduce(function(c, i) {
      if (!c) {
        c = i[k] || '';
      } else {
        c += i[k] ? ' ' + i[k] : '';
      }
      return c;
    }, '');
  }
  return function(str) {
    return str
      .replace(/ +/g, ' ')
      .trim()
      .split(' ')
      .reduce(function(c, i) {
        if (!c) {
          c = h(i) || '';
        } else {
          c += h(i) ? ' ' + h(i) : '';
        }
        return c;
      }, '');
  };
}
