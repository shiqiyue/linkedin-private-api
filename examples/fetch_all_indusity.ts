import { Client } from '../src';
import linkedinIndustryJson from './linkedin_industry.json'
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
  for (const linkedinIndustryJsonEle of linkedinIndustryJson) {
    try{
      const results  = await  Promise.all([client.search.searchIndustry({keywords: linkedinIndustryJsonEle.text})])
      const ele = results[0]?.data?.elements?.[0]?.targetUnion?.industry



      // @ts-ignore
      linkedinIndustryJsonEle.id =ele
    }catch (e) {
      console.error(e)
    }

  }
  console.log(linkedinIndustryJson)
  fs.writeFileSync('./linkedin_industry2.json', JSON.stringify(linkedinIndustryJson))

})();
