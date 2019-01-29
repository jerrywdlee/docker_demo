'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');

const PORT = process.env['PORT'] || 3003;
const app = new Koa();
const router = new Router();

router
  .get('/', (ctx, next) => {
    ctx.body = '<h2>Hello World!</h2>';
  })
  .get('/api', (ctx, next) => {
    ctx.body = '<h1>Node API</h1>';
  })
  .get('/api/:tag', (ctx, next) => {
    ctx.body = `<h1>Node API</h1><p>${ctx.params['tag']}</p>`;
  })


app
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods());

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('connected');
  socket
    .on('io-ping', (msg) => {
      console.log(`io-ping: ${msg}`);
      socket.emit('io-pong', msg);
    })
})

server.listen(PORT);
console.log(`Server on localhost:${PORT}`);