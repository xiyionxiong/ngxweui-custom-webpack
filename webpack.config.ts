var pxtoviewport = require("postcss-px-to-viewport");
var autoprefixer = require("autoprefixer");


const postcssLoader = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    syntax: "postcss-less",
    plugins: () => [
      pxtoviewport({
        unitToConvert: 'px',
        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
        unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
        viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        exclude: [/node-modules/],
        selectorBlackList: ['.ignore', '.harilines', '.weui'],
        replace: true,
      }),
      autoprefixer({
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8"
        ],
        grid: true
      })
    ],
  }
}


module.exports = (config, options) => {
  config.module.rules.map(rule => {
    const name = String(rule.test);
    if (name === '/\\.less$/') {
      rule.use = rule.use.map(config => {
        if (config.loader.indexOf('postcss-loader') > -1) {
          return postcssLoader;
        }
        return config;
      })
      return rule;
    }
  })
  return config
}
