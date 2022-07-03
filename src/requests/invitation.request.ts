import { LinkedInRequest } from '../core/linkedin-request';
import { GetReceivedInvitationResponse } from '../responses/received-invitations.response.get';
import { GetSentInvitationResponse } from '../responses/sent-invitations.response.get';

export class InvitationRequest {
  private request: LinkedInRequest;

  constructor({ request }: { request: LinkedInRequest }) {
    this.request = request;
  }

  sendInvitation({ profileId, trackingId, message }: { profileId: string; trackingId: string; message?: string }): Promise<void> {
    const requestPayload = {
      trackingId,
      emberEntityName: 'growth/invitation/norm-invitation',
      invitee: {
        'com.linkedin.voyager.growth.invitation.InviteeProfile': {
          profileId,
        },
      },
      ...(message && { message }),
    };
    return this.request.post('growth/normInvitations', requestPayload);
  }

  sendInvitation2({
                    inviteeProfileUrn,
                    customMessage,
                  }: {
    inviteeProfileUrn: string;
    customMessage?: string;
  }): Promise<void> {
    const requestPayload = {
      inviteeProfileUrn,
      invitationRelationshipOptionType: 'OTHER',
      ...(customMessage && { customMessage }),
    };
    return this.request.post('voyagerRelationshipsDashMemberRelationships?action=verifyQuotaAndCreate', requestPayload);
  }

  cancelInvitation({invitationId}:{invitationId: string}):Promise<void>{
    const requestPayload = {
      invitationId: invitationId,
      invitationSharedSecret: null,
      isGenericInvitation: true,
    }
    return this.request.post(`relationships/invitations/${invitationId}?action=withdraw`, requestPayload);
  }

  getReceivedInvitations({ skip = 0, limit = 100 } = {}): Promise<GetReceivedInvitationResponse> {
    const queryParams = {
      start: skip,
      count: limit,
      q: 'receivedInvitation',
    };

    return this.request.get<GetReceivedInvitationResponse>('relationships/invitationViews', {
      params: queryParams,
    });
  }

  getSentInvitations({ skip = 0, limit = 100 } = {}): Promise<GetSentInvitationResponse> {
    const queryParams = {
      start: skip,
      count: limit,
      invitationType: 'CONNECTION',
      q: 'invitationType',
    };

    return this.request.get<GetSentInvitationResponse>('relationships/sentInvitationViewsV2', {
      params: queryParams,
    });
  }
}
