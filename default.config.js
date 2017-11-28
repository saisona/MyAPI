import * as configStore from 'basic-config-store';

export const config = {
  port: 3000,
  env: 'dev',
  store: configStore.createConfig(),
};

export const AVAILABLE_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  ANY: 'all',
};