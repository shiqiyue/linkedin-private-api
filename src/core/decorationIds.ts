import latestDecorationId from './latest_decorationId.json'

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
