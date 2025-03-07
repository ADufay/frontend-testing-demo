import { HttpConnector } from './http.connector.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class JSONHttpConnectorImpl implements HttpConnector {
  private async request(method: string, url: string, data?: any): Promise<any> {
    const config: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (method !== 'GET' && data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    return await response.json();
  }

  public get(url: string): Promise<any> {
    return this.request('GET', url);
  }

  public post(url: string, data: any): Promise<any> {
    return this.request('POST', url, data);
  }

  public put(url: string, data: any): Promise<any> {
    return this.request('PUT', url, data);
  }

  public patch(url: string, data: any): Promise<any> {
    return this.request('PATCH', url, data);
  }

  public delete(url: string): Promise<any> {
    return this.request('DELETE', url);
  }
}
