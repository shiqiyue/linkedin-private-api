import {flatten, keyBy} from 'lodash';

import {Client} from '../core/client';
import {CompanySearchHit} from '../entities/company-search-hit.entity';
import {MINI_COMPANY_TYPE} from '../entities/linkedin-mini-company.entity';
import {MiniCompany} from '../entities/mini-company.entity';
import {ProfileId} from '../entities/mini-profile.entity';
import {PeopleSearchHit} from '../entities/people-search-hit.entity';
import {GetBlendedSearchResponse} from '../responses/blended-search.reponse.get';
import {CompanySearchScroller} from '../scrollers/company-search.scroller';
import {PeopleSearchScroller} from '../scrollers/people-search.scroller';
import {JobSearchScroller} from '../scrollers/job-search.scroller';
import {LinkedInNetworkType} from '../types/network.enum';
import {ClustersSearchFilters, PeopleSearchFilters} from '../types/people-search-filters';
import {SearchResultType} from '../types/search-result-type.enum';
import {LinkedInSearchType} from '../types/search-type.enum';
import {JobSearchFilters} from '../types/job-search-filters';
import {getProfilesFromResponse} from './profile.repository';
import {JOB_POSTING_TYPE, LinkedInJobPosting} from '../entities/linkedin-job-posting';
import {BASE_COMPANY_TYPE, LinkedInBaseCompany} from '../entities/linkedin-base-company';
import {JobSearchHit} from '../entities/job-search-hit.entity';
import jp from 'jsonpath'

export class SearchRepository {
    client: Client;

    constructor({client}: { client: Client }) {
        this.client = client;
    }

    searchPeople({
                     skip = 0,
                     limit = 10,
                     filters = {},
                     keywords,
                 }: {
        skip?: number;
        limit?: number;
        filters?: PeopleSearchFilters;
        keywords?: string;
    } = {}): PeopleSearchScroller {
        return new PeopleSearchScroller({
            skip,
            limit,
            filters,
            keywords,
            fetchPeople: this.fetchPeople.bind(this),
        });
    }

    searchCompanies({
                        skip = 0,
                        limit = 10,
                        keywords,
                    }: {
        skip?: number;
        limit?: number;
        keywords?: string;
    } = {}): CompanySearchScroller {
        return new CompanySearchScroller({
            skip,
            limit,
            keywords,
            fetchCompanies: this.fetchCompanies.bind(this),
        });
    }

    searchOwnConnections({
                             skip = 0,
                             limit = 10,
                             filters = {},
                             keywords,
                         }: {
        skip?: number;
        limit?: number;
        filters?: Omit<PeopleSearchFilters, 'network'>;
        keywords?: string;
    } = {}): PeopleSearchScroller {
        return new PeopleSearchScroller({
            skip,
            limit,
            keywords,
            filters: {...filters, network: LinkedInNetworkType.F},
            fetchPeople: this.fetchPeople.bind(this),
        });
    }

    searchGeo({
                  keywords
              }: {
        keywords: string
    }): any {
        return this.client.request.search.searchGeo({keywords})
    }

    searchConnectionsOf({
                            profileId,
                            skip = 0,
                            limit = 10,
                            filters = {},
                            keywords,
                        }: {
        profileId: ProfileId;
        skip?: number;
        limit?: number;
        filters?: Omit<PeopleSearchFilters, 'network' | 'connectionOf'>;
        keywords?: string;
    }): PeopleSearchScroller {
        return new PeopleSearchScroller({
            skip,
            limit,
            keywords,
            filters: {...filters, connectionOf: profileId, network: LinkedInNetworkType.F},
            fetchPeople: this.fetchPeople.bind(this),
        });
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
    } = {}): JobSearchScroller {
        return new JobSearchScroller({
            skip,
            limit,
            filters,
            keywords,
            fetchJobs: this.fetchJobs.bind(this),
        });
    }

    private async fetchPeople({
                                  skip = 0,
                                  limit = 10,
                                  filters = {},
                                  keywords,
                              }: {
        skip?: number;
        limit?: number;
        filters?: PeopleSearchFilters;
        keywords?: string;
    } = {}): Promise<PeopleSearchHit[]> {
        const response = await this.client.request.search.searchBlended({
            keywords,
            skip,
            limit,
            filters: {...filters, resultType: LinkedInSearchType.PEOPLE},
            origin: "GLOBAL_SEARCH_HEADER"
        });

        const profiles = keyBy(getProfilesFromResponse<GetBlendedSearchResponse>(response), 'entityUrn');
        const searchHits = flatten(
            response.data.elements.filter(e => e.type === SearchResultType.SEARCH_HITS && e.elements).map(e => e.elements!),
        );
        const lazyIds = [];
        for (const profilesKey in profiles) {
            const urn = profilesKey.replace("urn:li:fs_miniProfile:", "")
            const lazyId = `urn:li:fsd_lazyLoadedActions:(urn:li:fsd_profileActions:(${urn},SEARCH,EMPTY_CONTEXT_ENTITY_URN),PEOPLE,SEARCH_SRP`
            lazyIds.push(lazyId)
        }
        const lazys = await this.client.request.search.lazyLoadAction({ids: lazyIds})
        console.log(lazys)

        return searchHits.map(searchHit => ({
            ...searchHit,
            profile: profiles[searchHit.targetUrn],
        }));
    }

    async fetchPeople2({
                           start = 0,
                           keywords = "",
                           query = {},
                       }: { start?: number; keywords?: string; query?: ClustersSearchFilters; } = {}): Promise<any> {
        const res = await this.client.request.search.searchCluster({
            start: start,
            keywords,
            query
        });
        const paging = res?.data?.paging
        const eles = res?.included
        const lazyIds = []
        let lazys = [];
        const profiles = [];
        for (const ele of eles) {
            const eleType = ele.$type
            if (eleType === "com.linkedin.voyager.dash.search.EntityResultViewModel") {
                profiles.push(ele)
            }
            if (eleType === "com.linkedin.voyager.dash.search.LazyLoadedActions") {
                lazyIds.push(ele.entityUrn)
            }
        }
        if (lazyIds.length > 0) {
            lazys = await this.client.request.search.lazyLoadAction({ids: lazyIds});
        }
        this.handleProfileLazy({profiles, lazys})

        console.log(paging, lazys, profiles)
        return {
            paging,
            profiles
        }
    }

    private handleProfileLazy({profiles, lazys}){
        const lazyRecords = [];
        const getLazyByUrn = function (urn) {
            for (const lazyRecord of lazyRecords) {
                if (lazyRecord.urn === urn) {
                    return lazyRecord
                }
            }
            return null
        };
        const getLazyByLazyUrn = function (urn) {
            for (const lazyRecord of lazyRecords) {
                if (lazyRecord.lazyUrn === urn) {
                    return lazyRecord
                }
            }
            return null
        };
        if(lazys){
            for (const resultsKey in lazys.data.results) {
                const lazyRecord = {
                    lazyUrn: undefined,
                    urn: undefined
                }
                lazyRecord.lazyUrn = lazys.data.results[resultsKey]
                lazyRecord.urn = lazyRecord.lazyUrn.replace("urn:li:fsd_lazyLoadedActions:(urn:li:fsd_profileActions:(", "").replace(",SEARCH,EMPTY_CONTEXT_ENTITY_URN),PEOPLE,SEARCH_SRP)", "")
                lazyRecords.push(lazyRecord)
            }
            for (const e of lazys.included) {
                if(e.$type === "com.linkedin.voyager.dash.feed.FollowingState"){
                    const lazyRecord = getLazyByUrn(e.entityUrn.replace("urn:li:fsd_followingState:urn:li:fsd_profile:", ""));
                    if(lazyRecord){
                        lazyRecord.followingState = e
                    }
                }
                if(e.$type === "com.linkedin.voyager.dash.identity.profile.Profile"){
                    const lazyRecord = getLazyByUrn(e.entityUrn.replace("urn:li:fsd_profile:", ""));
                    if(lazyRecord){
                        lazyRecord.profile = e
                    }
                }
                if(e.$type === "com.linkedin.voyager.dash.relationships.MemberRelationship"){
                    const lazyRecord = getLazyByUrn(e.entityUrn.replace("urn:li:fsd_memberRelationship:", ""));
                    if(lazyRecord){
                        lazyRecord.memberRelationship = e
                    }
                }
                if(e.$type === "com.linkedin.voyager.dash.relationships.invitation.Invitation"){
                    const lazyRecord = getLazyByUrn(e.inviteeMember.replace("urn:li:fsd_profile:", ""));
                    if(lazyRecord){
                        lazyRecord.invitation = e
                    }
                }
                if(e.$type === "com.linkedin.voyager.dash.search.LazyLoadedActions"){
                    const lazyRecord = getLazyByLazyUrn(e.entityUrn);
                    if(lazyRecord){
                        lazyRecord.actions = e
                    }
                }
            }
        }
        for (const e of profiles) {
            e.lazy = getLazyByLazyUrn(e.lazyLoadedActionsUrn)
        }
    }

    private async fetchCompanies({
                                     skip = 0,
                                     limit = 10,
                                     keywords,
                                 }: {
        skip?: number;
        limit?: number;
        keywords?: string;
    }): Promise<CompanySearchHit[]> {
        const response = await this.client.request.search.searchBlended({
            skip,
            limit,
            keywords,
            filters: {resultType: LinkedInSearchType.COMPANIES},
        });

        const companies = response.included
            .filter(entity => entity.$type === MINI_COMPANY_TYPE)
            .map(company => ({
                ...company,
                companyId: company.entityUrn.replace('urn:li:fs_miniCompany:', ''),
            })) as MiniCompany[];

        const companiesByUrn = keyBy(companies, 'entityUrn');
        const searchHits = flatten(
            response.data.elements.filter(e => e.type === SearchResultType.SEARCH_HITS && e.elements).map(e => e.elements!),
        );

        return searchHits.map(searchHit => ({
            ...searchHit,
            company: companiesByUrn[searchHit.targetUrn],
        }));
    }

    private async fetchJobs({
                                skip = 0,
                                limit = 10,
                                filters = {},
                                keywords,
                            }: {
        skip?: number;
        limit?: number;
        filters?: JobSearchFilters;
        keywords?: string;
    } = {}): Promise<JobSearchHit[]> {
        const response = await this.client.request.search.searchJobs({
            filters,
            keywords,
            skip,
            limit,
        });

        const jobPostings = response?.included?.filter(element => element.$type === JOB_POSTING_TYPE) as LinkedInJobPosting[];
        const companies = response?.included?.filter(element => element.$type === BASE_COMPANY_TYPE) as LinkedInBaseCompany[];

        const keyedPostings = keyBy(jobPostings, 'entityUrn');
        const keyedCompanies = keyBy(companies, 'entityUrn');

        const searchHits = response?.data?.elements.map(searchHit => {
            const jobPosting = keyedPostings[searchHit.hitInfo.jobPosting];
            const company = keyedCompanies[jobPosting.companyDetails.company];

            const populatedPosting = {
                ...jobPosting,
                companyDetails: {...jobPosting.companyDetails, company},
            };

            return {
                ...searchHit,
                hitInfo: {
                    ...searchHit.hitInfo,
                    jobPosting: populatedPosting,
                },
            };
        });

        return searchHits;
    }
}
