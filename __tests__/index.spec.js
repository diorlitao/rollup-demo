import myLib from '../src/index';

describe('myLib', () => {
  describe('add()', () => {
    test('adds two numbers', () => {
      expect(myLib.add(1, 2)).toBe(3);
    });

    it('works with negative numbers', () => {
      expect(myLib.add(-1, -2)).toBe(-3);
    });
    
    test('works with zeros', () => {
      expect(myLib.add(0, 0)).toBe(0);
    });

    // ... 更多测试用例
  });
});
