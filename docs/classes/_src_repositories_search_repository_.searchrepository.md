**[shiqiyue-linkedin-private-api](../README.md)**

> [Globals](../globals.md) / ["src/repositories/search.repository"](../modules/_src_repositories_search_repository_.md) / SearchRepository

# Class: SearchRepository

## Hierarchy

* **SearchRepository**

## Index

### Constructors

* [constructor](_src_repositories_search_repository_.searchrepository.md#constructor)

### Properties

* [client](_src_repositories_search_repository_.searchrepository.md#client)

### Methods

* [fetchPeople2](_src_repositories_search_repository_.searchrepository.md#fetchpeople2)
* [searchCompanies](_src_repositories_search_repository_.searchrepository.md#searchcompanies)
* [searchConnectionsOf](_src_repositories_search_repository_.searchrepository.md#searchconnectionsof)
* [searchGeo](_src_repositories_search_repository_.searchrepository.md#searchgeo)
* [searchJobs](_src_repositories_search_repository_.searchrepository.md#searchjobs)
* [searchOwnConnections](_src_repositories_search_repository_.searchrepository.md#searchownconnections)
* [searchPeople](_src_repositories_search_repository_.searchrepository.md#searchpeople)

## Constructors

### constructor

\+ **new SearchRepository**(`__namedParameters`: { client: [Client](_src_core_client_.client.md)  }): [SearchRepository](_src_repositories_search_repository_.searchrepository.md)

*Defined in [src/repositories/search.repository.ts:25](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L25)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { client: [Client](_src_core_client_.client.md)  } |

**Returns:** [SearchRepository](_src_repositories_search_repository_.searchrepository.md)

## Properties

### client

•  **client**: [Client](_src_core_client_.client.md)

*Defined in [src/repositories/search.repository.ts:25](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L25)*

## Methods

### fetchPeople2

▸ **fetchPeople2**(`__namedParameters?`: { keywords: string = ""; query: ClustersSearchFilters ; start: number = 0 }): Promise<any\>

*Defined in [src/repositories/search.repository.ts:176](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L176)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { keywords: string = ""; query: ClustersSearchFilters ; start: number = 0 } | {} |

**Returns:** Promise<any\>

___

### searchCompanies

▸ **searchCompanies**(`__namedParameters?`: { keywords: string ; limit: number = 10; skip: number = 0 }): [CompanySearchScroller](_src_scrollers_company_search_scroller_.companysearchscroller.md)

*Defined in [src/repositories/search.repository.ts:51](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L51)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { keywords: string ; limit: number = 10; skip: number = 0 } | {} |

**Returns:** [CompanySearchScroller](_src_scrollers_company_search_scroller_.companysearchscroller.md)

___

### searchConnectionsOf

▸ **searchConnectionsOf**(`__namedParameters`: { filters: Omit<PeopleSearchFilters, \"network\" \| \"connectionOf\"\> ; keywords: string ; limit: number = 10; profileId: string ; skip: number = 0 }): [PeopleSearchScroller](_src_scrollers_people_search_scroller_.peoplesearchscroller.md)

*Defined in [src/repositories/search.repository.ts:96](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L96)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { filters: Omit<PeopleSearchFilters, \"network\" \| \"connectionOf\"\> ; keywords: string ; limit: number = 10; profileId: string ; skip: number = 0 } |

**Returns:** [PeopleSearchScroller](_src_scrollers_people_search_scroller_.peoplesearchscroller.md)

___

### searchGeo

▸ **searchGeo**(`__namedParameters`: { keywords: string  }): any

*Defined in [src/repositories/search.repository.ts:88](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L88)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { keywords: string  } |

**Returns:** any

___

### searchJobs

▸ **searchJobs**(`__namedParameters?`: { filters: JobSearchFilters ; keywords: string ; limit: number = 10; skip: number = 0 }): [JobSearchScroller](_src_scrollers_job_search_scroller_.jobsearchscroller.md)

*Defined in [src/repositories/search.repository.ts:118](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L118)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { filters: JobSearchFilters ; keywords: string ; limit: number = 10; skip: number = 0 } | {} |

**Returns:** [JobSearchScroller](_src_scrollers_job_search_scroller_.jobsearchscroller.md)

___

### searchOwnConnections

▸ **searchOwnConnections**(`__namedParameters?`: { filters: Omit<PeopleSearchFilters, \"network\"\> ; keywords: string ; limit: number = 10; skip: number = 0 }): [PeopleSearchScroller](_src_scrollers_people_search_scroller_.peoplesearchscroller.md)

*Defined in [src/repositories/search.repository.ts:68](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L68)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { filters: Omit<PeopleSearchFilters, \"network\"\> ; keywords: string ; limit: number = 10; skip: number = 0 } | {} |

**Returns:** [PeopleSearchScroller](_src_scrollers_people_search_scroller_.peoplesearchscroller.md)

___

### searchPeople

▸ **searchPeople**(`__namedParameters?`: { filters: PeopleSearchFilters ; keywords: string ; limit: number = 10; skip: number = 0 }): [PeopleSearchScroller](_src_scrollers_people_search_scroller_.peoplesearchscroller.md)

*Defined in [src/repositories/search.repository.ts:31](https://github.com/shiqiyue/linkedin-private-api/blob/ff42743/src/repositories/search.repository.ts#L31)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { filters: PeopleSearchFilters ; keywords: string ; limit: number = 10; skip: number = 0 } | {} |

**Returns:** [PeopleSearchScroller](_src_scrollers_people_search_scroller_.peoplesearchscroller.md)
