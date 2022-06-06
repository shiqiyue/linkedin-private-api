import countryJson from './country2.json'
import fs from 'fs'

import tJson from './t.json'

(async () => {
    const getLinkedByCode = function(alpha3, alpha2){
        for (const tJsonElement of tJson) {
            if(tJsonElement.code === alpha3){
                return tJsonElement.linkedin
            }
            if(tJsonElement.code === alpha2){
                return tJsonElement.linkedin
            }
        }
        return null
    }

  for (const countryJsonElement of countryJson) {
      if(countryJsonElement.linkedinGeo){
          countryJsonElement.linkedinGeo = countryJsonElement.linkedinGeo.replace("urn:li:fsd_geo:","")
      }
      if(!countryJsonElement.linkedinGeo){
          countryJsonElement.linkedinGeo = getLinkedByCode(countryJsonElement.alpha3, countryJsonElement.alpha2)
      }

  }
    fs.writeFileSync('./country3.json', JSON.stringify(countryJson))



})();
