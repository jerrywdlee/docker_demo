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

const Redis = require('ioredis');
const REDIS_HOST = process.env['REDIS_HOST'] || '127.0.0.1';
const REDIS_PORT = process.env['REDIS_PORT'] ||6379;
const redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
const psub = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
// redis.set('hoge', 'fuga', 'EX', 10);
redis.config('set', 'notify-keyspace-events', 'Ex');
// const psubKey = '__key*@*__:*'; // All key events & spaces in all DB
const psubKey = '__keyevent@0__:expired'; // All key events & spaces in all DB
psub.psubscribe(psubKey, (err, count) => {
  if (err) {
    console.error('err', err);
  }
  // console.log('count', count);
});
psub.on('pmessage', (pattern, channel, message) => {
  console.log('pattern', pattern);
  console.log('channel', channel);
  console.log('message', message);
});

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('connected');
  socket
    .on('io-ping', (msg) => {
      console.log(`io-ping: ${msg}`);
      socket.emit('io-pong', msg);
      redis.set(`io-ping@${msg}`, msg, 'EX', 10);
    })
  psub.on('pmessage', (pattern, channel, message) => {
    socket.emit('key-expired', message);
  });
})

server.listen(PORT);
console.log(`Server on localhost:${PORT}`);