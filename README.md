用一个简单的 js 库示例，介绍如何使用 Rollup 打包 js 库。

假设我们有一个名为 "my-lib" 的 js 库，目录结构如下：

```shell
my-lib/
├── src/
│ ├── index.js
│ └── utils.js
├── LICENSE
├── package.json
├── README.md
├── babel.config.js
└── rollup.config.js
```

其中，src 目录存放着源代码，LICENSE、package.json 和 README.md 分别为许可协议、项目描述和文档，babel.config.js 为 Babel 的配置文件，rollup.config.js 为 Rollup 的配置文件。

index.js 内容

```javascript
import { add, sayHello } from './utils';

const myLib = {
  add,
  sayHello,
};
export default myLib;
```

在该示例代码中，我们导入了 src/utils.js 中定义的 add, sayHello 函数，并将它作为 myLib 中的方法导出，最后使用 export default 导出整个 myLib 对象。

utils.js 内容

```javascript
/**
 * 输出 "Hello, World!" 在控制台
 */
export function sayHello() {
  console.log('Hello, World!');
}
// 其他的函数
```

1. 安装依赖

进入到项目根目录，执行以下命令来安装 Rollup 和其他依赖：

```shell
npm install --save-dev rollup @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-terser @babel/core @babel/preset-env @babel/runtime  @babel/runtime-corejs3  @babel/plugin-transform-runtime
```

其中的 @rollup/plugin-babel、@rollup/plugin-commonjs 和 @rollup/plugin-node-resolve 分别为 Rollup 提供的工具插件，用于打包库中的 js 模块。
@babel/preset-env 模块是一个 Babel 插件，可以将 ES6+的 JavaScript 代码编译为向后兼容的 ES5 代码,
@babel/core 则是 Babel 编译器的核心模块，需要一起安装,
@babel/runtime 和 @babel/plugin-transform-runtime 两个相关的 Babel 插件库，以便在编译过程中正确使用 Babel 编译器,而 rollup-plugin-terser 则为 Rollup 提供的一个压缩插件，用于在打包后最小化文件大小。

2.  配置文件

rollup.config.js 中我们通过 Babel 工具来将 ES6 模块转换成可在浏览器中运行的 JS 代码，并使用 Terser 对代码进行压缩 ，其代码如下：

```javascript
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/my-lib.min.js',
    format: 'iife',
    name: 'myLib',
  },
  //  生成两个文件
  // output: [
  //   {
  //     file: 'dist/my-lib.js',
  //     format: 'iife',
  //     name: 'myLib',
  //   },
  //   {
  //     file: 'dist/my-lib.min.js',
  //     format: 'iife',
  //     name: 'myLib',
  //   },
  // ],
  plugins: [
    babel({
      presets: ['@babel/preset-env'], // 配置 Babel 编译的预设。
      plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]], // 配置 Babel 编译的插件。
      babelHelpers: 'runtime', // 配置 Babel helpers 生成的方式
    }),
    commonjs(),
    resolve(),
    terser(),
  ],
};
```

在该配置文件中，我们将 src/index.js 文件作为输入，输出到 dist/my-lib.min.js 文件中，格式为 iife （立即执行函数表达式），变量名为 myLib。同时，使用 babel 对以 ES6 编写的代码进行转换,这里使用了 @babel/preset-env 预设，它会根据目标浏览器的版本（可以通过 browserslist 配置）自动识别和编译需要转换的语法特性。比如，如果你使用了 ES6 模块的 import/export 语法特性，那么 @babel/preset-env 就会帮你将其转成 CommonJS 标准的 require/module.exports，以便在浏览器或 Node.js 环境中正常运行。另外，我们也使用了 @babel/plugin-transform-runtime 插件。这个插件的作用是用零污染的方式向目标代码中注入 Helper 函数，避免代码冗余。同时，它还可以将一些特殊的语法转化为对 @babel/runtime 模块的调用。通过配置这个插件，我们可以避免在每个需要 Helper 的模块中重复编写它们，从而减少生成的代码量。最后，我们还配置了 babelHelpers: 'runtime'，这个配置用于指定 Babel 编译时启用哪种 helpers 生成方式，可以是 'bundled'、'inline' 或者 'runtime'，其中 'runtime' 表示使用 @babel/runtime 中的 helpers。
使用 commonjs 将没有使用 ES6 模块的第三方库转换成 ES6 模块，使用 resolve 来解析依赖，最后使用 terser 来将代码压缩,生成两个文件：my-lib.js 和 my-lib.min.js。

在项目中的 Babel 配置文件中（如 .babelrc 或 babel.config.js）添加 @babel/plugin-transform-runtime 这个插件：

```javascript
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3, // 重要：指定 runtime-corejs3 版本
        helpers: true,
        useESModules: false,
      },
    ],
  ],
};
```

在添加插件时，需要注意插件的各种配置项，比如例子中的 corejs 选项，用于使用 runtime-corejs3 版本的 helpers。 更多参数配置可以参考 官方文档说明。

3. 打包测试
   在以上配置完成后，我们通过执行命令 npx rollup -c 来运行打包：

```shell
npx rollup -c
```

执行完命令后，我们将在 dist 目录下生成 my-lib.min.js 文件，该文件包含我们的 js 库及其所有依赖，并且已经进行了压缩处理和转换为适用于浏览器运行的代码。

此时，我们可以在 HTML 文件中引入该库文件，并使用其中的函数和方法：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Lib Example</title>
  </head>
  <body>
    <button id="btn">Click Me</button>
    <script src="./dist/my-lib.min.js"></script>
    <script>
      const btn = document.querySelector('#btn');
      btn.addEventListener('click', function () {
        myLib.sayHello();
        console.log(myLib(4, 9));
      });
    </script>
  </body>
</html>
```

在以上 HTML 文件中，我们通过 <script> 标签引入并使用了我们的 my-lib.min.js 库文件，并在表单按钮上添加了单击监听事件，调用了 myLib.sayHello() 方法打印出 Hello, World! 的信息。

到这里，我们就成功地使用 Rollup 打包了一个简单的 js 库，并在实际使用中进行了测试。

二. 单元测试
添加单元测试可以帮助你更好地保证代码的质量和稳定性，以及减少在后续开发中因为代码修改而引入的潜在问题。

1. 安装 Jest

```shell
npm install --save-dev jest
```

2. 创建测试用例文件：
   在项目根目录下创建一个 **tests** 目录，在该目录下创建 your-test.spec.js 文件，作为测试用例的入口文件。示例代码如下：

```javascript
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
```

在上述示例代码中，我们使用 Jest 提供的 describe() 和 it() 函数来描述测试用例。其中，describe('myLib', () => {}) 表示测试 myLib 库，it('adds two numbers', () => {}) 表示一种测试场景。使用 expect() 和 toBe() 函数来检查测试的值是否与预期值相等。

3. 修改 package.json 文件：
   在 package.json 文件的 scripts 中添加一个名为 test 的脚本：

```json
"scripts": {
  "build": "rollup -c",
  "test": "jest"
},
```

运行单元测试：
最后，在终端中运行以下命令来运行单元测试：

```shell
npm run test
```

当我们想模拟浏览器中测试，需要安装支持测试浏览器中运行 JavaScript 的库，例如 jsdom 和 jest-environment-jsdom：

```shell
npm install --save-dev jsdom jest-environment-jsdom
```

在测试文件中导入 'dist/my-lib.min.js' 文件，并创建 DOM 环境：

```javascript
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
```

在上述代码中，我们通过 fs 和 path 模块加载 'dist/my-lib.min.js' 文件的代码，然后使用 JSDOM 创建一个模拟的浏览器环境，并将 'dist/my-lib.min.js' 的代码注入到模拟的 DOM 中。最后，我们把模拟的浏览器环境中的全局对象中的 myLib 变量赋值给本地的 myLib 变量，以供测试用例使用。

在终端中运行以下命令来运行单元测试：

```shell
npm run test
```

结果

```shell

PASS  __tests__/index.spec.js
PASS  __tests__/myLib.test.js

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        4.74 s
Ran all test suites.
```
