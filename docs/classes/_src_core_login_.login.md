**[shiqiyue-linkedin-private-api](../README.md)**

> [Globals](../globals.md) / ["src/core/login"](../modules/_src_core_login_.md) / Login

# Class: Login

## Hierarchy

* **Login**

## Index

### Constructors

* [constructor](_src_core_login_.login.md#constructor)

### Methods

* [userCookie](_src_core_login_.login.md#usercookie)
* [userPass](_src_core_login_.login.md#userpass)

## Constructors

### constructor

\+ **new Login**(`__namedParameters`: { client: [Client](_src_core_client_.client.md)  }): [Login](_src_core_login_.login.md)

*Defined in [src/core/login.ts:21](https://github.com/shiqiyue/linkedin-private-api/blob/0c4d2d1/src/core/login.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { client: [Client](_src_core_client_.client.md)  } |

**Returns:** [Login](_src_core_login_.login.md)

## Methods

### userCookie

▸ **userCookie**(`__namedParameters`: { cookies: AuthCookies ; useCache: boolean = true; username: string  }): Promise<[Client](_src_core_client_.client.md)\>

*Defined in [src/core/login.ts:111](https://github.com/shiqiyue/linkedin-private-api/blob/0c4d2d1/src/core/login.ts#L111)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { cookies: AuthCookies ; useCache: boolean = true; username: string  } |

**Returns:** Promise<[Client](_src_core_client_.client.md)\>

___

### userPass

▸ **userPass**(`__namedParameters`: { password: string ; useCache: boolean = true; username: string  }): Promise<[Client](_src_core_client_.client.md)\>

*Defined in [src/core/login.ts:78](https://github.com/shiqiyue/linkedin-private-api/blob/0c4d2d1/src/core/login.ts#L78)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { password: string ; useCache: boolean = true; username: string  } |

**Returns:** Promise<[Client](_src_core_client_.client.md)\>
