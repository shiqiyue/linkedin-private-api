**[shiqiyue-linkedin-private-api](../README.md)**

> [Globals](../globals.md) / ["src/core/client"](../modules/_src_core_client_.md) / Client

# Class: Client

## Hierarchy

* **Client**

## Index

### Constructors

* [constructor](_src_core_client_.client.md#constructor)

### Properties

* [conversation](_src_core_client_.client.md#conversation)
* [invitation](_src_core_client_.client.md#invitation)
* [login](_src_core_client_.client.md#login)
* [message](_src_core_client_.client.md#message)
* [myProfile](_src_core_client_.client.md#myprofile)
* [profile](_src_core_client_.client.md#profile)
* [request](_src_core_client_.client.md#request)
* [search](_src_core_client_.client.md#search)

## Constructors

### constructor

\+ **new Client**(`__namedParameters?`: { decorationIds: [DecorationIds](../interfaces/_src_core_decorationids_.decorationids.md) ; httpAgent: any ; httpsAgent: any ; proxy: AxiosProxyConfig  }): [Client](_src_core_client_.client.md)

*Defined in [src/core/client.ts:25](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L25)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { decorationIds: [DecorationIds](../interfaces/_src_core_decorationids_.decorationids.md) ; httpAgent: any ; httpsAgent: any ; proxy: AxiosProxyConfig  } | {} |

**Returns:** [Client](_src_core_client_.client.md)

## Properties

### conversation

•  **conversation**: [ConversationRepository](_src_repositories_conversation_repository_.conversationrepository.md) = new ConversationRepository({ client: this })

*Defined in [src/core/client.ts:39](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L39)*

___

### invitation

•  **invitation**: [InvitationRepository](_src_repositories_invitation_repository_.invitationrepository.md) = new InvitationRepository({ client: this })

*Defined in [src/core/client.ts:35](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L35)*

___

### login

•  **login**: [Login](_src_core_login_.login.md) = new Login({ client: this })

*Defined in [src/core/client.ts:31](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L31)*

___

### message

•  **message**: [MessageRepository](_src_repositories_message_repository_.messagerepository.md) = new MessageRepository({ client: this })

*Defined in [src/core/client.ts:41](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L41)*

___

### myProfile

• `Optional` **myProfile**: [Profile](../interfaces/_src_entities_profile_entity_.profile.md)

*Defined in [src/core/client.ts:25](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L25)*

___

### profile

•  **profile**: [ProfileRepository](_src_repositories_profile_repository_.profilerepository.md) = new ProfileRepository({ client: this })

*Defined in [src/core/client.ts:37](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L37)*

___

### request

•  **request**: [LinkedInRequest](_src_core_linkedin_request_.linkedinrequest.md)

*Defined in [src/core/client.ts:23](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L23)*

___

### search

•  **search**: [SearchRepository](_src_repositories_search_repository_.searchrepository.md) = new SearchRepository({ client: this })

*Defined in [src/core/client.ts:33](https://github.com/shiqiyue/linkedin-private-api/blob/5ccb708/src/core/client.ts#L33)*
