// console.log( 'webpack.config.js配置文件执行了...' )
// postcss插件
const path = require( "path" )

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    syntax: "postcss-less",
    plugins: () => [
      // https://blog.csdn.net/Charissa2017/article/details/105420971
      require( "postcss-px-to-viewport" )( {
        unitToConvert: 'px',
        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
        // viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        // propList: [ '*' ],
        unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
        viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        // mediaQuery: true,
        exclude: [ /node-modules/ ],
        // exclude: [ /\/node-modules\//],
        selectorBlackList: [ '.ignore', '.harilines', '.weui' ],
        replace: true,
      } ),
      require( "autoprefixer" )( {
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8"
        ],
        grid: true
      } )
    ]
  }
}

module.exports = ( config, options ) => {
  // 第一步过滤掉系统的css和less处理

  config.module.rules = config.module.rules.filter(
    rule => rule.test.toString() !== "/\\.less$/" && rule.test.toString() !== '/\\.css$/'
  )

  // 配置自定义的less处理
  config.module.rules.push( {
    test: /\.(less)$/,
    exclude: [],
    use: [ "raw-loader", postcssLoader, "less-loader" ]
  } )

  config.module.rules.push( {
    test: /\.(less)$/,
    include: [],
    use: [ "style-loader", postcssLoader, "less-loader" ]
  } )



  // console.log( 'config ==>', config )
  return config
}
