function registerSimpleRouter (router) {
  router.get('/simple/get', async function(ctx, next) {
    await next();
    ctx.body = {
      msg: `hello world`
    };
  })
}

function registerBaseRouter (router) {
  router.get('/base/get', async function(ctx, next) {
    await next();
    ctx.body = ctx.request.query;
  });

  router.post('/base/post', async function(ctx, next) {
    await next();
    ctx.body = ctx.request.body;
  });

  router.post('/base/buffer', function(ctx, next) {
    let msg = []
    ctx.req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    });
    ctx.req.on('end', async () => {
      let buf = Buffer.concat(msg)
      await next();
      ctx.body = buf.toJSON();
    });
  });
}

function registerErrorRouter (router) {
  router.get('/error/get', async function(ctx, next) {
    await next();
    // ctx.body = 'hello world get';
    if (Math.random() > 0.5) {
      ctx.body = 'hello world';
    } else {
      ctx.response.status = 500;
      ctx.response.end();
    }
  });
  
  router.get('/error/timeout', async function(ctx, next) {
    await next();
    // ctx.body = `hello world 3000`;
    setTimeout(() => {
      ctx.body = 'hello world';
    }, 3000)
  })
}

function registerExtendRouter (router) {
  
}

module.exports =  registerRoutes = (router) => {
  registerSimpleRouter(router);
  registerBaseRouter(router);
  registerErrorRouter(router);
}