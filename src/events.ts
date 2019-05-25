import io = require('socket.io');
import config, { Options } from './config';

export default (socket: io.Socket): void => {
  socket.on('config', (): boolean =>
    socket.emit('config', config));

  socket.on('typo', (options: Options): boolean => {
    // TODO: implement tcp socket with urlinsane.
    console.log(options);
    return socket.emit('typo', options);
  });
}