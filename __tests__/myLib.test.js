import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

describe('my lib', () => {
  let myLib;

  beforeAll(() => {
    const code = fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'my-lib.min.js'), 'utf-8');
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`, { runScripts: 'dangerously' });
    const scriptEl = dom.window.document.createElement('script');
    scriptEl.textContent = code;
    dom.window.document.body.appendChild(scriptEl);
    myLib = dom.window.myLib;
  });

  test('adds two numbers correctly', () => {
    expect(myLib.add(1, 2)).toBe(3);
  });

  // ...更多测试用例
});
