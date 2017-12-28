import * as configStore from 'basic-config-store';

export const api = {
  API_VERSION: '0.0.4',
  API_BRANCH: 'dev',
  API_COLLECT: true,
};

export const config = {
  port: api.API_BRANCH === 'dev' ? 1337: api.API_BRANCH === 'prod' ? 3000 : 3001,
  env: 'prod',
  store: configStore.createConfig(),
  GOOGLE_AUTH_ID : '724984107224-ns4du56rtqsdt76ki391rn3olkap7754.apps.googleusercontent.com',
  GOOGLE_AUTH_SECRET: 'zmJO__gCPo_GN_So8M-cDdqQ',
  GOOGLE_API_KEY: 'AIzaSyA3sGSVv8KBm-g3NliVSosSKL0P4P5fjt0',
  GITHUB_API_KEY: 'c5f55adb0ffd5bfb19b57d73e00a9ff242ee9f2b',
  GITHUB_AUTH_ID: '94e80bb42b355c95b9a8',
  GITHUB_AUTH_SECRET: 'f311e4adb1b3fc023ba34a08c897c166c6e3bd37',
};
