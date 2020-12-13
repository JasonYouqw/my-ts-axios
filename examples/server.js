const path = require('path');
const koa = require('koa2');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const webpackconfig = require('./webpack.config');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');
const router = require('koa-router')();

const app = new koa();

// koa body
app.use(koaBody({
  multipart: true,
}));

// koa static
app.use(koaStatic(
  path.resolve(__dirname, '../examples')
));

// koa logger
app.use(koaLogger());

app.use(router.routes()).use(router.allowedMethods());

// dev middleware
// const compiler = webpack(webpackconfig);
// app.use(devMiddleware(compiler, {
//   noInfo: true,
//   publicPath: webpackconfig.output.publicPath
// }));
// hot middleware
// app.use(hotMiddleware(compiler, {
//   reload: true,
// }));

const compiler = webpack(webpackconfig);
app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackconfig.output.publicPath
}));

// hot load
app.use(hotMiddleware(compiler, {
  reload: true
}));


app.listen(
  8080,
  () => {
    console.log('app server has been started on port 8080')
  }
);
