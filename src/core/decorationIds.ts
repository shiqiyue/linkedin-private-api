import latestDecorationId from './latest_decorationId.json'
import axios from 'axios'
export interface DecorationIds {
    FullProfileWithEntities: string;
    SearchClusterCollection: string;
    SearchLazyLoadedActions: string;
    ReusableTypeaheadCollection: string;
    WebJobSearchHitLite: string;

}

export function defaultDecorationIds():DecorationIds{
    return latestDecorationId
}

export async function remoteDecorationIds(agent): Promise<DecorationIds>{
    const url = "https://raw.githubusercontent.com/shiqiyue/linkedin-private-api/master/src/core/latest_decorationId.json";
    const response = await axios.get(url, {
        httpsAgent: agent,
        httpAgent: agent
    });

    return response.data

}
