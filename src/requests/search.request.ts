import { GetJobSearchResponse } from '../responses/jobs-search.reponse.get';
import { JobSearchFilters } from '../types/job-search-filters';
import { LinkedInRequest } from '../core/linkedin-request';
import { GetBlendedSearchResponse } from '../responses/blended-search.reponse.get';
import { BlendedSearchFilters } from '../types/blended-search-filters';
import {ClustersSearchFilters} from "../types";
import {paramsSerializer2,paramsSerializer, querySerializer} from "../utils";
import JSONbigint from 'json-bigint'

export class SearchRequest {
  private request: LinkedInRequest;

  constructor({ request }: { request: LinkedInRequest }) {
    this.request = request;
  }

  searchBlended({
    skip = 0,
    limit = 10,
    filters = {},
    keywords,
                  origin = "TYPEAHEAD_ESCAPE_HATCH"
  }: {
    skip?: number;
    limit?: number;
    filters?: BlendedSearchFilters;
    keywords?: string;
    origin?: string;
  }): Promise<GetBlendedSearchResponse> {
    const queryParams = {
      filters,
      count: limit,
      ...(keywords ? { keywords: encodeURIComponent(keywords) } : {}),
      origin: origin,
      q: 'all',
      queryContext: {
        spellCorrectionEnabled: true,
        relatedSearchesEnabled: true,
        kcardTypes: "PROFILE|COMPANY"
      },
      start: skip,
    };
    /*const headers = Object.assign(this.request.request.defaults.headers, {
      accept: "application/json"
    });
    headers["Accept-Language"]= "en-US,en;q=0.5"
    delete headers["x-li-page-instance"]
    delete headers["x-li-track"]*/
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(paramsSerializer(queryParams))
    return this.request.get<GetBlendedSearchResponse>('search/blended', {
      params: queryParams,
/*
      headers
*/
    });
  }

  searchCluster({start=0, query= {}, keywords = ""}:{start?:number;query?:ClustersSearchFilters;keywords:string}): Promise<any>{
    const q = {
      flagshipSearchIntent: "SEARCH_SRP",
      keywords: encodeURIComponent(keywords),
      queryParameters: Object.assign({
        resultType: ["PEOPLE"]
      }, query),
      includeFiltersInResponse: false
    };

    const queryStr = querySerializer(q)
    const u = `search/dash/clusters?decorationId=${this.request.decorationIds.SearchClusterCollection}&origin=SWITCH_SEARCH_VERTICAL&q=all&query=${queryStr}&start=${start}`;
    console.log(u)
    //u = "search/dash/clusters?decorationId=com.linkedin.voyager.dash.deco.search.SearchClusterCollection-154&origin=GLOBAL_SEARCH_HEADER&q=all&query=(keywords:%E9%9E%8B%E5%AD%90,flagshipSearchIntent:SEARCH_SRP,queryParameters:(geoUrn:List(102890883),network:List(F,S),resultType:List(PEOPLE)),includeFiltersInResponse:false)&start=0"
    return this.request.get<any>(u);
  }

  lazyLoadAction({ids }:{ids?:any[]}): Promise<any>{
    const nids = [];
    for (const id of ids) {
      nids.push(encodeURIComponent(id).replace(/\(/g, '%28').replace(/\)/g, '%29'))
    }
    const url = `voyagerSearchDashLazyLoadedActions?decorationId=${this.request.decorationIds.SearchLazyLoadedActions}&ids=List(${nids.join(',')})`;
   // url = `voyagerSearchDashLazyLoadedActions?decorationId=com.linkedin.voyager.dash.deco.search.SearchLazyLoadedActions-48&ids=List(urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAAACjJWwB1nL0koXu5sgiDrhOdNAEBzYSz8I%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAAAKoTx4BzuxiLmnAB-8IkGbioS1pyUCb-kU%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAAAXfwFoB7BEMU4WVtJymRcg4ETFqeV1X2jg%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAAAapjhMBbN1sih3ReaUCd3LqQKoXhshcZuk%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAAAkD72UBEVn2-aHK1if9Zlyt9cdLGfdJlzU%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAAAoIDSQBzeWjq0nX5RsFCu9AQKDsZf4c-j4%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAABPWg2MBjdSDBzW7NR5ifQDI9Yzx_6EXJl4%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAABaiRqAB6_LokIHCuC4L0TevgbRxUVSvJLQ%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAABiiPOcBpivToLeTM6V90AIM89Xia1Wb568%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29,urn%3Ali%3Afsd_lazyLoadedActions%3A%28urn%3Ali%3Afsd_profileActions%3A%28ACoAACeAU9oBECIpnaYJdopLb4IbPZem7TlHhKk%2CSEARCH%2CEMPTY_CONTEXT_ENTITY_URN%29%2CPEOPLE%2CSEARCH_SRP%29)`

    console.log(url)
    return this.request.get<any>(url,{ transformResponse: function(data, headers) {
        return JSONbigint().parse(data);
      }});
  }

  searchGeo({keywords}:{keywords:string}):any{
    keywords = encodeURIComponent(keywords)
    return this.request.get<GetBlendedSearchResponse>(`voyagerSearchDashReusableTypeahead?decorationId=${this.request.decorationIds.ReusableTypeaheadCollection}&keywords=${keywords}&q=type&query=(typeaheadFilterQuery:(geoSearchTypes:List(MARKET_AREA,COUNTRY_REGION,ADMIN_DIVISION_1,CITY)))&type=GEO`);
  }

  searchIndustry({keywords}:{keywords:string}):any{
    keywords = encodeURIComponent(keywords)
    return this.request.get<GetBlendedSearchResponse>(`voyagerSearchDashReusableTypeahead?decorationId=${this.request.decorationIds.ReusableTypeaheadCollection}&keywords=${keywords}&q=type&query=(typeaheadFilterQuery:(standardizationEntityType:industry))&type=INDUSTRY`);
  }

  searchJobs({
    skip = 0,
    limit = 10,
    filters = {},
    keywords,
  }: {
    skip?: number;
    limit?: number;
    filters?: JobSearchFilters;
    keywords?: string;
  }): Promise<GetJobSearchResponse> {
    const queryParams = {
      filters,
      count: limit,
      ...(keywords ? { keywords: encodeURIComponent(keywords) } : {}),
      origin: 'JOB_SEARCH_RESULTS_PAGE',
      decorationId: this.request.decorationIds.WebJobSearchHitLite,
      q: 'jserpFilters',
      queryContext: {
        primaryHitType: 'JOBS',
        spellCorrectionEnabled: true,
      },
      start: skip,
    };

    return this.request.get<GetJobSearchResponse>('search/hits', {
      params: queryParams,
    });
  }
}
