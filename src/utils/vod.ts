import * as POPCore from '@alicloud/pop-core';

export function initVodClient(accessKeyId: string, secretAccessKey: string) {
  const regionId = 'cn-shanghai';   // 点播服务接入区域
  // @ts-ignore
  return new POPCore.RPCClient({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
    apiVersion: '2017-03-21'
  });
}