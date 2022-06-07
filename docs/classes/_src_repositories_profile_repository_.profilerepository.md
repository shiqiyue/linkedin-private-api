**[shiqiyue-linkedin-private-api](../README.md)**

> [Globals](../globals.md) / ["src/repositories/profile.repository"](../modules/_src_repositories_profile_repository_.md) / ProfileRepository

# Class: ProfileRepository

## Hierarchy

* **ProfileRepository**

## Index

### Constructors

* [constructor](_src_repositories_profile_repository_.profilerepository.md#constructor)

### Methods

* [getFullProfile](_src_repositories_profile_repository_.profilerepository.md#getfullprofile)
* [getOwnProfile](_src_repositories_profile_repository_.profilerepository.md#getownprofile)
* [getProfile](_src_repositories_profile_repository_.profilerepository.md#getprofile)

## Constructors

### constructor

\+ **new ProfileRepository**(`__namedParameters`: { client: [Client](_src_core_client_.client.md)  }): [ProfileRepository](_src_repositories_profile_repository_.profilerepository.md)

*Defined in [src/repositories/profile.repository.ts:31](https://github.com/eilonmore/linkedin-private-api/blob/c1b3769/src/repositories/profile.repository.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { client: [Client](_src_core_client_.client.md)  } |

**Returns:** [ProfileRepository](_src_repositories_profile_repository_.profilerepository.md)

## Methods

### getFullProfile

▸ **getFullProfile**(`__namedParameters`: { publicIdentifier: string  }): Promise<any\>

*Defined in [src/repositories/profile.repository.ts:65](https://github.com/eilonmore/linkedin-private-api/blob/c1b3769/src/repositories/profile.repository.ts#L65)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { publicIdentifier: string  } |

**Returns:** Promise<any\>

___

### getOwnProfile

▸ **getOwnProfile**(): Promise<[Profile](../interfaces/_src_entities_profile_entity_.profile.md) \| null\>

*Defined in [src/repositories/profile.repository.ts:53](https://github.com/eilonmore/linkedin-private-api/blob/c1b3769/src/repositories/profile.repository.ts#L53)*

**Returns:** Promise<[Profile](../interfaces/_src_entities_profile_entity_.profile.md) \| null\>

___

### getProfile

▸ **getProfile**(`__namedParameters`: { publicIdentifier: string  }): Promise<[Profile](../interfaces/_src_entities_profile_entity_.profile.md)\>

*Defined in [src/repositories/profile.repository.ts:37](https://github.com/eilonmore/linkedin-private-api/blob/c1b3769/src/repositories/profile.repository.ts#L37)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { publicIdentifier: string  } |

**Returns:** Promise<[Profile](../interfaces/_src_entities_profile_entity_.profile.md)\>
