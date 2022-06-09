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

  constructor({ proxy,httpAgent,httpsAgent,decorationIds }: RequestOpts = {}) {
    this.request = axios.create({
      paramsSerializer,
      withCredentials: true,
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

/*    this.request.interceptors.request.use(function (config){
      console.log('请求参数:', config)
      return config
    }, error => {
      return Promise.reject(error);
    })*/
/*    this.request.interceptors.response.use(function (response){
      console.log('返回结果', response)
      return response
    }, error => {
      console.log('返回错误:', error)
      return Promise.reject(error)
    })*/
    this.request.defaults.adapter = require('axios/lib/adapters/http');

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
