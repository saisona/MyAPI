import * as configStore from 'basic-config-store';

export const config = {
  port: 3000,
  SOCKET_IO_PORT: 4200,
  env: 'dev',
  store: configStore.createConfig(),
  HOST: 'http://localhost:',
};