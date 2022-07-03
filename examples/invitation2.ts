import { Client } from '../src';
import { SocksProxyAgent } from 'socks-proxy-agent'
var agent = new SocksProxyAgent(`socks://127.0.0.1:10808`);
var JSESSIONID = "ajax:8462475366033195827";
var li_at = "AQEDATp3vT0FeQRWAAABgEd2ry0AAAGBUJ0tVlYAG--0uWMuRh8DweF5nMjcNPSv6tcgDxGIbMU488u8p_MCM4_y53xtqGTdhIMp5BuqlHJgHby3lIyZh4L6-OAsAkOpBBlsgUS-pzJek-aEOXkHqrlr";
li_at = "AQEDATp3vT0FeQRWAAABgEd2ry0AAAGBnsEkkFYAidIYTrTZcrhjBoBByWIXL2fipdyj0CvUopH7iUJJuHGNBXpOU1EnIQ4tIQD5ZH-FHaHhP2-h5Je6EDk7ANDCMfOxsGiEeW9sQTIYrVRoijkdE-ue";
JSESSIONID = "ajax:8462475366033195827";
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


  const sentInvitation = await client.invitation.sendInvitation2({
    inviteeProfileUrn:"urn:li:fsd_profile:ACoAACUygZ4BgjSpo7m9VyBFySf_OD3qxGcO0nk"
  });

  console.log("sentInvitation",sentInvitation)
 //await client.invitation.cancelInvitation({invitationId:"6938830431068774400"})

})();
