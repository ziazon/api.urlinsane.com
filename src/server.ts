import { createServer, Server } from 'http';
import bl = require('benchlogga');
import io = require('socket.io');
import config from './config';

interface Options {
  domains: string[];
  funcs: string[];
  keyboards: string[];
  typos: string[];
}

const http: Server = createServer();

const server: io.Server = io(http);

const port: number = +(process.env.PORT || 8080);

server.on('connection', (socket: io.Socket): void => {
  bl.log('info', `'${socket.id}' connected.`);

  socket.on('config', (): boolean =>
    socket.emit('config', config));

  socket.on('typo', (options: Options): boolean =>
    // TODO: implement tcp socket with urlinsane.
    socket.emit('typo', JSON.stringify(options)));

});

http.listen(port, (): void =>
  bl.log('info', `URLInsane API Server listening at port ${port}`));
