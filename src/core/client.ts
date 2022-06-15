import { AxiosProxyConfig } from 'axios';

import {
  ConversationRepository,
  InvitationRepository,
  MessageRepository,
  ProfileRepository,
  SearchRepository,
} from '../repositories';
import { LinkedInRequest } from './linkedin-request';
import { Login } from './login';
import {DecorationIds} from "./decorationIds";
import {Profile} from "../entities";
import {AuthCookies} from "../types";

interface ClientOpts {
  proxy?: AxiosProxyConfig;
  httpAgent?: any;
  httpsAgent?: any;
  decorationIds?: DecorationIds
}

export class Client {
  request: LinkedInRequest;

  myProfile?: Profile;

  li_at?: string;

  AuthCookies?:AuthCookies;

  constructor({ proxy,httpAgent, httpsAgent,decorationIds }: ClientOpts = {}) {
    this.request = new LinkedInRequest({ proxy,httpAgent, httpsAgent,decorationIds });
  }

  login = new Login({ client: this });

  search = new SearchRepository({ client: this });

  invitation = new InvitationRepository({ client: this });

  profile = new ProfileRepository({ client: this });

  conversation = new ConversationRepository({ client: this });

  message = new MessageRepository({ client: this });

  clone(): Client {
    const client = new Client(this.request.configs);
     client.login.userCookie({
      cookies: this.AuthCookies,
      useCache: false
    })
    client.myProfile = this.myProfile
    return client
  }
}
