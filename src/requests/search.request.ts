import { GetJobSearchResponse } from '../responses/jobs-search.reponse.get';
import { JobSearchFilters } from '../types/job-search-filters';
import { LinkedInRequest } from '../core/linkedin-request';
import { GetBlendedSearchResponse } from '../responses/blended-search.reponse.get';
import { BlendedSearchFilters } from '../types/blended-search-filters';
import {ClustersSearchFilters} from "../types";
import {paramsSerializer2, querySerializer} from "../utils";

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
    const u = `search/dash/clusters?decorationId=com.linkedin.voyager.dash.deco.search.SearchClusterCollection-154&origin=GLOBAL_SEARCH_HEADER&q=all&query=${queryStr}&start=${start}`;
    console.log(u)
    //u = "search/dash/clusters?decorationId=com.linkedin.voyager.dash.deco.search.SearchClusterCollection-154&origin=GLOBAL_SEARCH_HEADER&q=all&query=(keywords:%E9%9E%8B%E5%AD%90,flagshipSearchIntent:SEARCH_SRP,queryParameters:(geoUrn:List(102890883),network:List(F,S),resultType:List(PEOPLE)),includeFiltersInResponse:false)&start=0"
    return this.request.get<any>(u);
  }

  lazyLoadAction({ids }:{ids?:any[]}): Promise<any>{
    const nids = [];
    for (const id of ids) {
      nids.push(encodeURIComponent(id).replace(/\(/g, '%28').replace(/\)/g, '%29'))
    }
    const url = `voyagerSearchDashLazyLoadedActions?decorationId=com.linkedin.voyager.dash.deco.search.SearchLazyLoadedActions-47&ids=List(${nids.join(',')})`

    console.log(url)
    return this.request.get<any>(url);
  }

  searchGeo({keywords}:{keywords:string}):any{
    keywords = encodeURIComponent(keywords)
    return this.request.get<GetBlendedSearchResponse>(`voyagerSearchDashReusableTypeahead?decorationId=com.linkedin.voyager.dash.deco.search.typeahead.ReusableTypeaheadCollection-26&keywords=${keywords}&q=type&query=(typeaheadFilterQuery:(geoSearchTypes:List(MARKET_AREA,COUNTRY_REGION,ADMIN_DIVISION_1,CITY)))&type=GEO`);
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
      decorationId: 'com.linkedin.voyager.deco.jserp.WebJobSearchHitLite-14',
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
