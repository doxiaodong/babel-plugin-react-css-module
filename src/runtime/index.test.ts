import fn from '.';

describe('test/_rcm_style_fn', () => {
  it('get right class hash', () => {
    expect(
      fn([
        {
          a: 'ndhsabd_a',
          b: 'dnsajnmf_b',
        },
      ])('a'),
    ).toBe('ndhsabd_a');

    expect(
      fn([
        {
          a: 'ndhsabd_a',
          b: 'dnsajnmf_b',
        },
      ])('a b'),
    ).toBe('ndhsabd_a dnsajnmf_b');

    expect(
      fn([
        {
          a: 'ndhsabd_a',
          b: 'dnsajnmf_b',
        },
      ])('b a'),
    ).toBe('dnsajnmf_b ndhsabd_a');

    expect(
      fn([
        {
          a: 'ndhsabd_a',
          b: 'dnsajnmf_b',
        },
      ])('ab'),
    ).toBe('');
  });

  it('get right class hash when multi css', () => {
    expect(
      fn([
        {
          a: 'ndhsabd_a',
          b: 'dnsajnmf_b',
        },
        {
          a: 'nddahsabd_aa',
          c: 'dnccxsajnmf_cc',
        },
      ])('a'),
    ).toBe('ndhsabd_a nddahsabd_aa');

    expect(
      fn([
        {
          a: 'ndhsabd_a',
          b: 'dnsajnmf_b',
        },
        {
          a: 'nddahsabd_aa',
          c: 'dnccxsajnmf_cc',
        },
      ])('a c'),
    ).toBe('ndhsabd_a nddahsabd_aa dnccxsajnmf_cc');

    expect(
      fn([
        {
          a: 'ndhsabd_a',
          b: 'dnsajnmf_b',
        },
        {
          a: 'nddahsabd_aa',
          c: 'dnccxsajnmf_cc',
        },
      ])('b c'),
    ).toBe('dnsajnmf_b dnccxsajnmf_cc');
  });
});
