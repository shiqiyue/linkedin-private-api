import { remoteDecorationIds} from '../src';
import {SocksProxyAgent} from 'socks-proxy-agent'

const agent = new SocksProxyAgent(`socks://127.0.0.1:10808`);


(async () => {
  const r = await remoteDecorationIds((agent));
  console.log(r)
})();
