import { replace } from 'testdouble';

import { mockAxios } from './mockAxios';
import { mockLogin } from './mockLogin';

export const defaultMocks = async (): Promise<{ Client: any; axios: { get: any; post: any; defaults: any } }> => {

  const { axios } = mockAxios();

  mockLogin(axios);

  const { Client } = await import('../../src/core/client');

  return { Client, axios };
};
