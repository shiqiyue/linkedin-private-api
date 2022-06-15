import {Client, LinkedInNetworkType} from '../src';
import fs from 'fs'
import {SocksProxyAgent} from 'socks-proxy-agent'

const agent = new SocksProxyAgent(`socks://127.0.0.1:10808`);
let JSESSIONID = "ajax:8462475366033195827";
let li_at = "AQEDATp3vT0FeQRWAAABgEd2ry0AAAGBUJ0tVlYAG--0uWMuRh8DweF5nMjcNPSv6tcgDxGIbMU488u8p_MCM4_y53xtqGTdhIMp5BuqlHJgHby3lIyZh4L6-OAsAkOpBBlsgUS-pzJek-aEOXkHqrlr";
li_at = "AQEDATjPoZgFFYM-AAABgWJ1WAMAAAGBhoHcA04ArqaloNxHcjyAypjD0Mp_m6yx30URvIzo57SKCrfynk0n5Xg9_uZ_25REqEOlbcoMMk9ovqr8GIDRjkQkEQhgo32_q0KgG_jX5-vIDK7e2RaH8Nj6";
JSESSIONID = "ajax:3513817161874270460";



(async () => {
  const client = new Client({
    httpAgent: agent,
    httpsAgent:agent
  });
  await client.login.userCookie({
    cookies:{
      JSESSIONID: JSESSIONID,
      li_at: li_at,
      lang: "v=2&lang=zh-cn"
    },
    useCache: false
  })

  let peopleSearchScroller = client.search.searchOwnConnections();
  let res = [];
  while(!peopleSearchScroller.hitEndOfResults){
    res.push(...await peopleSearchScroller.scrollNext());
  }
  console.log(res)

  peopleSearchScroller = client.search.searchOwnConnections();
   res = []
  while(!peopleSearchScroller.hitEndOfResults){
    res.push(...await peopleSearchScroller.scrollNext());
  }
  console.log(res)

  const profile =  await client.profile.getFullProfile({publicIdentifier:"ACoAAAHe1A4BZ7OSmXIVRB0NupZR6990b0dv6f8"})

  fs.writeFileSync("./fetchFriends.json", JSON.stringify(res))
  fs.writeFileSync("./fullProfile.json", JSON.stringify(profile))

  /*
    // Search for profiles and send an invitation
    const peopleScroller = await client.search.searchPeople({
      keywords: 'shoe',
  /!*    filters:{
        network: [LinkedInNetworkType.S, LinkedInNetworkType.F]
      }*!/
    });
    let profiles = await peopleScroller.scrollNext();


    console.log(profiles);
    profiles = await peopleScroller.scrollNext();




    console.log(profiles);
    profiles = await peopleScroller.scrollNext();




    console.log(profiles);*/
})();
