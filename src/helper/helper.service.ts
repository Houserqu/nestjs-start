import { Injectable, HttpService } from '@nestjs/common';
import { loggerRequest } from 'src/common/Log4j.logger';
import * as queryString from 'query-string';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class Helper {
  constructor(private httpService: HttpService) {
    // 设置 axios 拦截器，打印日志
    this.httpService.axiosRef.interceptors.response.use((response) => {
      const log = {
        url: response.config.url,
        reqBody: JSON.stringify(response.config.data),
        headers: JSON.stringify(response.config.headers),
        status: response.status,
        data: JSON.stringify(response.data),
      }
      loggerRequest.info(queryString.stringify(log, {encode: false, sort: false}))
      return response;
    });
  }

  /**
   * axios GET 请求
   * @param url 
   * @param config 
   */
  public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService.get(url, config).toPromise()
  }

  /**
   * axios POST 请求
   * @param url 
   * @param config 
   */
  public post(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService.get(url, config).toPromise()
  }

  /**
   * axios 自定义请求
   * @param config 
   */
  public axios(config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService.request(config).toPromise()
  }
}
