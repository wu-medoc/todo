module.exports = {
  publicPath: '/todo/',

  chainWebpack: config => {
    config.performance
      .maxAssetSize(1000000)
      .maxEntrypointSize(1000000)
  }
}
