const path = require('path')//引入路径处理文件
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入一个插件，该插件是个构造函数

module.exports = {
  // 模式: 生产环境
  mode: 'production',
  // 入口
  entry: {
    
    app: path.resolve(__dirname, 'src/index.js')//找到本地src的index文件
  },
  // 出口(打包生成js)
  output: {
    filename: 'static/js/[name].bundle.js',//生成一个输出文件
    path: path.resolve(__dirname, 'dist')//输出到dist文件，
  },
  // 模块加载器
  module: {
    rules: [
      {
        test: /\.js$/,   //处理所有js文件
          include:[path.resolve(__dirname,"src")],  //src下面的js文件才会被处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']

          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',//将那个页面作为模板页面进行打包,在哪执行的命令上哪里去找该模板
      filename: 'index.html'//生成的页面（在ooutPut指定的路径下）

    })
  ],
  devServer:{
    open:true,
    quiet:true
  },
  devtool: 'cheap-module-eval-source-map',
  //方便开发中调试


  




}