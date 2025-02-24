import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosProxyConfig } from 'axios';
import { URL } from 'url';

import { linkedinApiUrl } from '../../config';
import { paramsSerializer } from '../utils/paramsSerializer';
import * as AxiosLogger from 'axios-logger';
import {DecorationIds, defaultDecorationIds} from "./decorationIds";

const buildUrl = (url: string) => new URL(url, linkedinApiUrl).toString();

type ConfigFullResponse = AxiosRequestConfig & { fullResponse?: true };
type ConfigNonFullResponse = AxiosRequestConfig & { fullResponse?: false };

interface RequestOpts {
  proxy?: AxiosProxyConfig;
  httpAgent? : any;
  httpsAgent? : any;
  decorationIds?: DecorationIds

}

export class Request {
  request: AxiosInstance;

  decorationIds: DecorationIds;

  configs?: any

  constructor({ proxy,httpAgent,httpsAgent,decorationIds }: RequestOpts = {}) {
    this.request = axios.create({
      paramsSerializer,
      withCredentials: true,
      timeout: 30000,
      httpAgent,
      httpsAgent,
      ...(proxy && { proxy }),
    });
    this.request.interceptors.request.use(AxiosLogger.requestLogger);

    this.request.interceptors.response.use(AxiosLogger.responseLogger);
    if(decorationIds){
      this.decorationIds = decorationIds
    }else{
      this.decorationIds = defaultDecorationIds()
    }

    this.request.defaults.adapter = require('axios/lib/adapters/http');
    this.configs = {}
    this.configs.proxy = proxy
    this.configs.httpAgent = httpAgent
    this.configs.httpsAgent = httpsAgent
    this.configs.decorationIds = decorationIds

  }

  setHeaders(headers: Record<string, string>): void {
    this.request.defaults.headers = headers;
  }

  async get<T>(url: string, reqConfig?: ConfigNonFullResponse): Promise<T>;
  async get<T>(url: string, reqConfig?: ConfigFullResponse): Promise<AxiosResponse<T>>;
  async get<T>(url: string, reqConfig?: ConfigFullResponse | ConfigNonFullResponse): Promise<T | AxiosResponse<T>> {
    const response = await this.request.get<T>(buildUrl(url), reqConfig);

    return reqConfig?.fullResponse ? response : response.data;
  }

  async post<T>(url: string, data: string | Record<string, unknown>, reqConfig?: ConfigNonFullResponse): Promise<T>;
  async post<T>(url: string, data: string | Record<string, unknown>, reqConfig?: ConfigFullResponse): Promise<AxiosResponse<T>>;
  async post<T>(
    url: string,
    data: string | Record<string, unknown>,
    reqConfig?: ConfigFullResponse | ConfigNonFullResponse,
  ): Promise<T | AxiosResponse<T>> {
    const response = await this.request.post<T>(buildUrl(url), data, reqConfig);

    return reqConfig?.fullResponse ? response : response.data;
  }
}
