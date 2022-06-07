import { GetJobSearchResponse } from '../responses/jobs-search.reponse.get';
import { JobSearchFilters } from '../types/job-search-filters';
import { LinkedInRequest } from '../core/linkedin-request';
import { GetBlendedSearchResponse } from '../responses/blended-search.reponse.get';
import { BlendedSearchFilters } from '../types/blended-search-filters';

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
