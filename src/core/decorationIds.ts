import latestDecorationId from './latest_decorationId.json'
import axios from 'axios'
export interface DecorationIds {
    FullProfileWithEntities: string;
    WebTopCardCore: string;
    TopCardSupplementary: string;
    SearchClusterCollection: string;
    SearchLazyLoadedActions: string;
    ReusableTypeaheadCollection: string;
    WebJobSearchHitLite: string;

}

export function defaultDecorationIds():DecorationIds{
    return latestDecorationId
}

export async function remoteDecorationIds(agent): Promise<DecorationIds>{
    let url = "https://raw.githubusercontent.com/shiqiyue/linkedin-private-api/master/src/core/latest_decorationId.json";
    try{
        const response = await axios.get(url, {
            httpsAgent: agent,
            httpAgent: agent
        });
        return response.data
    }catch (e) {
        url = "https://ghproxy.com/" + url
        const response = await axios.get(url, {
            httpsAgent: agent,
            httpAgent: agent
        });
        return response.data
    }



}
