const path = require('path')
const { override, overrideDevServer, addWebpackAlias } = require('customize-cra')

const setOutput = () => (config) => {
  // 微应用的包名，这里与主应用中注册的微应用名称一致
  config.output.library = `micro-app`
  // 将你的 library 暴露为所有的模块定义下都可运行的方式
  config.output.libraryTarget = 'umd'
  // 按需加载相关，设置为 webpackJsonp_react-project 即可
  config.output.jsonpFunction = `webpackJsonp_micro-app`

  return config
}

const setDevHeaders = (headers) => (config, env) => {
  config.headers = {
    ...config.headers,
    ...headers
  }
  config.historyApiFallback = true
  return config
}

module.exports = {
  webpack: override(
    setOutput(),
    addWebpackAlias({
      '@': path.join(__dirname, './src')
    })
  ),
  devServer: overrideDevServer(
    setDevHeaders({
      'X-Author': 'sls',
      'Access-Control-Allow-Origin': '*'
    })
  )
}
