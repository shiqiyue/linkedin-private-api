import { Client } from '../src';
import countryJson from './country.json'
import { SocksProxyAgent } from 'socks-proxy-agent'
var agent = new SocksProxyAgent(`socks://127.0.0.1:10808`);
var JSESSIONID = "ajax:8462475366033195827";
var li_at = "AQEDATp3vT0FeQRWAAABgEd2ry0AAAGBUJ0tVlYAG--0uWMuRh8DweF5nMjcNPSv6tcgDxGIbMU488u8p_MCM4_y53xtqGTdhIMp5BuqlHJgHby3lIyZh4L6-OAsAkOpBBlsgUS-pzJek-aEOXkHqrlr";
import fs from 'fs'

(async () => {
  const waitASecond = async  function() {
    return new Promise(resolve => {
      setTimeout(resolve, 3000)
    })
  }
  const client = new Client({
    httpAgent: agent,
    httpsAgent:agent
  });
  await client.login.userCookie({
    cookies:{
      JSESSIONID: JSESSIONID,
      li_at: li_at,
      lang: "v=2&lang=zh-cn",
    },
    useCache: false
  })
  const getEle = function(eles, text){
    if(!eles || eles.length === 0){
      return null
    }
    for (const ele of eles) {
      if(ele.title.text.toLowerCase() === text.toLowerCase()){
        return ele
      }
    }
    return null
  }
  const getFirstEle = function(eles){
    if(!eles || eles.length === 0){
      return null
    }
    return eles[0]
  }
  for (const countryJsonElement of countryJson) {
    try{
      const results  = await  Promise.all([client.search.searchGeo({keywords: countryJsonElement.country_name})])
      const ele = getEle(results[0].data.elements,countryJsonElement.country_name );


      if(!ele){
        console.log(countryJsonElement.country_name, "不存在")
        continue
      }
      console.log(countryJsonElement.alpha3,ele.title.text, ele.target["*geo"])
      // @ts-ignore
      countryJsonElement.linkedinGeo = ele.target["*geo"]
    }catch (e) {
      console.error(e)
    }

  }
  console.log(countryJson)
  fs.writeFileSync('./country2.json', JSON.stringify(countryJson))

})();
