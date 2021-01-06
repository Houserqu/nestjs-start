import * as CryptoJS from "crypto-js"
import * as tripledes from "crypto-js/tripledes"

export class ValidateRes {
  msgCode: string;
  msgCreateTime: number
}

export default function(msgCode, msgStr, secret): ValidateRes  {
  let msgRightCode;
  let msgCreateTime;

  try{
    const msgStrArray = tripledes.decrypt(msgStr, secret)
    .toString(CryptoJS.enc.Utf8)
    .split('&');
    msgRightCode = msgStrArray[0];
    msgCreateTime = msgStrArray[1] * 1

    if(new Date().getTime() - msgCreateTime > 300000) {
      throw new Error('expired')
    }

    if(msgCode !== msgRightCode) {
      throw new Error('error')
    }

    return {
      msgCode: msgRightCode,
      msgCreateTime
    }
  } catch (e) {
    throw new Error(e)
  }
}