import {Client, LinkedInNetworkType} from '../src';

import {SocksProxyAgent} from 'socks-proxy-agent'

var agent = new SocksProxyAgent(`socks://127.0.0.1:10808`);
var JSESSIONID = "ajax:8462475366033195827";
var li_at = "AQEDATp3vT0FeQRWAAABgEd2ry0AAAGBUJ0tVlYAG--0uWMuRh8DweF5nMjcNPSv6tcgDxGIbMU488u8p_MCM4_y53xtqGTdhIMp5BuqlHJgHby3lIyZh4L6-OAsAkOpBBlsgUS-pzJek-aEOXkHqrlr";
li_at = "AQEDATjPoZgAnhC-AAABgJRsIwUAAAGBUJpSzE4AMvDoN_82jtHpdtmPKiyfbksimYOYoabKkPGs3BNHn26zWxLp1MUG22fb-lqdT6v8fTFgDXNApHBkOxGECdvsnq_stdOKjHpi9FSXyczD_OZtPo_8";
JSESSIONID = "ajax:6265576855753707858";

(async () => {
  const client = new Client({
    httpAgent: agent,
    httpsAgent:agent
  });
  await client.login.userCookie({
    cookies:{
      JSESSIONID: JSESSIONID,
      li_at: li_at
    },
    useCache: false
  })


  // Search for profiles and send an invitation
  const peopleScroller = await client.search.searchPeople({
    keywords: 'shoe',
    filters:{
      network: [LinkedInNetworkType.S, LinkedInNetworkType.F]
    }
  });
  const profiles = await peopleScroller.scrollNext();




  console.log(profiles);
})();
