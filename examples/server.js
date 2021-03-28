const path = require('path');
const koa = require('koa2');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const webpackconfig = require('./webpack.config');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');
const router = require('koa-router')();

const registerRoutes = require('./router');

const app = new koa();

// koa body
app.use(koaBody({
  multipart: true,
}));

// koa static
console.log(`static path:${__dirname}`);
app.use(koaStatic(
  __dirname
));

// koa logger
app.use(koaLogger());

app.use(bodyParser());
registerRoutes(router);
app.use(router.routes()).use(router.allowedMethods());

console.log(`publicPath:${webpackconfig.output.publicPath}`);
// dev middleware
const compiler = webpack(webpackconfig);
app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackconfig.output.publicPath
}));
// hot middleware
app.use(hotMiddleware(compiler, {
  reload: true,
}));


app.listen(
  8080,
  () => {
    console.log('app server has been started on port 8080')
  }
);
