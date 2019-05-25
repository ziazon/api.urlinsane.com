import { createServer, Server } from 'http';
import bl = require('benchlogga');
import io = require('socket.io');
import registerEvents from './events';

const http: Server = createServer();

const server: io.Server = io(http);

const port: number = +(process.env.PORT || 8080);

server.on('connection', (socket: io.Socket): void => {
  bl.log('info', `'${socket.id}' connected.`);
  registerEvents(socket);
});

http.listen(port, (): void =>
  bl.log('info', `URLInsane API Server listening at port ${port}`));
