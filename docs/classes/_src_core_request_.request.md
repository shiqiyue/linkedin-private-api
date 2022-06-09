**[shiqiyue-linkedin-private-api](../README.md)**

> [Globals](../globals.md) / ["src/core/request"](../modules/_src_core_request_.md) / Request

# Class: Request

## Hierarchy

* **Request**

  ↳ [LinkedInRequest](_src_core_linkedin_request_.linkedinrequest.md)

## Index

### Constructors

* [constructor](_src_core_request_.request.md#constructor)

### Properties

* [decorationIds](_src_core_request_.request.md#decorationids)
* [request](_src_core_request_.request.md#request)

### Methods

* [get](_src_core_request_.request.md#get)
* [post](_src_core_request_.request.md#post)
* [setHeaders](_src_core_request_.request.md#setheaders)

## Constructors

### constructor

\+ **new Request**(`__namedParameters?`: { decorationIds: [DecorationIds](../interfaces/_src_core_decorationids_.decorationids.md) ; httpAgent: any ; httpsAgent: any ; proxy: AxiosProxyConfig  }): [Request](_src_core_request_.request.md)

*Defined in [src/core/request.ts:25](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L25)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { decorationIds: [DecorationIds](../interfaces/_src_core_decorationids_.decorationids.md) ; httpAgent: any ; httpsAgent: any ; proxy: AxiosProxyConfig  } | {} |

**Returns:** [Request](_src_core_request_.request.md)

## Properties

### decorationIds

•  **decorationIds**: [DecorationIds](../interfaces/_src_core_decorationids_.decorationids.md)

*Defined in [src/core/request.ts:25](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L25)*

___

### request

•  **request**: AxiosInstance

*Defined in [src/core/request.ts:23](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L23)*

## Methods

### get

▸ **get**<T\>(`url`: string, `reqConfig?`: ConfigNonFullResponse): Promise<T\>

*Defined in [src/core/request.ts:64](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L64)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`reqConfig?` | ConfigNonFullResponse |

**Returns:** Promise<T\>

▸ **get**<T\>(`url`: string, `reqConfig?`: ConfigFullResponse): Promise<AxiosResponse<T\>\>

*Defined in [src/core/request.ts:65](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L65)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`reqConfig?` | ConfigFullResponse |

**Returns:** Promise<AxiosResponse<T\>\>

___

### post

▸ **post**<T\>(`url`: string, `data`: string \| Record<string, unknown\>, `reqConfig?`: ConfigNonFullResponse): Promise<T\>

*Defined in [src/core/request.ts:72](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L72)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`data` | string \| Record<string, unknown\> |
`reqConfig?` | ConfigNonFullResponse |

**Returns:** Promise<T\>

▸ **post**<T\>(`url`: string, `data`: string \| Record<string, unknown\>, `reqConfig?`: ConfigFullResponse): Promise<AxiosResponse<T\>\>

*Defined in [src/core/request.ts:73](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L73)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`data` | string \| Record<string, unknown\> |
`reqConfig?` | ConfigFullResponse |

**Returns:** Promise<AxiosResponse<T\>\>

___

### setHeaders

▸ **setHeaders**(`headers`: Record<string, string\>): void

*Defined in [src/core/request.ts:60](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/request.ts#L60)*

#### Parameters:

Name | Type |
------ | ------ |
`headers` | Record<string, string\> |

**Returns:** void
