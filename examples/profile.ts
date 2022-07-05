import {Client} from '../src';


import {SocksProxyAgent} from 'socks-proxy-agent'
import fs from "fs";

var agent = new SocksProxyAgent(`socks://127.0.0.1:10808`);
var JSESSIONID = "ajax:8462475366033195827";
var li_at = "AQEDATp3vT0FeQRWAAABgEd2ry0AAAGBUJ0tVlYAG--0uWMuRh8DweF5nMjcNPSv6tcgDxGIbMU488u8p_MCM4_y53xtqGTdhIMp5BuqlHJgHby3lIyZh4L6-OAsAkOpBBlsgUS-pzJek-aEOXkHqrlr";
li_at = "AQEDATp3vT0FeQRWAAABgEd2ry0AAAGBnsEkkFYAidIYTrTZcrhjBoBByWIXL2fipdyj0CvUopH7iUJJuHGNBXpOU1EnIQ4tIQD5ZH-FHaHhP2-h5Je6EDk7ANDCMfOxsGiEeW9sQTIYrVRoijkdE-ue";
JSESSIONID = "ajax:8462475366033195827";
JSESSIONID = "ajax:3513817161874270460";
li_at = "AQEDATjPoZgFFYM-AAABgWJ1WAMAAAGB4XJ5y04APSjd8GpU_YzEjd10IhyDJz3o7AxrPGl6AkSOpi5tOHWvCWLphBUP33UYOAl-yPZwKT-6BP7DUntFr4GQpf1UGzVRvrxeB04l4lScPovpqyzKX1cY";
(async () => {
    const client = new Client({
        httpAgent: agent,
        httpsAgent: agent
    });
    await client.login.userCookie({
        cookies: {
            JSESSIONID: JSESSIONID,
            li_at: li_at,
            bcookie: "v=2&f997268b-dcb7-4f8e-8665-351ff1c74ff4",
            bscookie: "v=1&20200818080927c9398724-8cfd-4b56-88f7-9df6a2d3fe8eAQFeT0DjEw4LM6u44mHmE3J8Z1TyHX4J",
            lang: "v=2&lang=zh-cn",
            liap: "true",
            lidc: "b=TB16:s=T:r=T:a=T:p=T:g=3977:u=9:x=1:i=1654480031:t=1654508311:v=2:sig=AQE5jlQsOm4W7GtWM9GvbpsGFjEAuM_g",

        },
        username: "wwy",
        useCache: false
    })


    //const fullProfile = await client.profile.getOwnProfile();
    const profile = await client.profile.getProfile2({publicIdentifier: "john-carney-07a151196"})
    //const profile =  await client.profile.getProfile({publicIdentifier: 'petersacco91'})
    // const ownProfile = await client.profile.getOwnProfile();

    console.log(profile);
    fs.writeFileSync("./fetchProfile5.json", JSON.stringify(profile))

})();
