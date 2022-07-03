import {filter, get, keyBy, map} from 'lodash';

import {Client} from '../core/client';
import {COMPANY_TYPE, LinkedInCompany} from '../entities/linkedin-company.entity';
import {LinkedInMiniProfile, MINI_PROFILE_TYPE} from '../entities/linkedin-mini-profile.entity';
import {LinkedInProfile, PROFILE_TYPE} from '../entities/linkedin-profile.entity';
import {LinkedInVectorImage} from '../entities/linkedin-vector-image.entity';
import {MiniProfile, ProfileId} from '../entities/mini-profile.entity';
import {Profile} from '../entities/profile.entity';

const getProfilePictureUrls = (picture?: LinkedInVectorImage): string[] =>
  map(picture?.artifacts, artifact => `${picture?.rootUrl}${artifact.fileIdentifyingUrlPathSegment}`);

const transformMiniProfile = (miniProfile: LinkedInMiniProfile): MiniProfile => ({
  ...miniProfile,
  pictureUrls: getProfilePictureUrls(miniProfile.picture),
  profileId: (miniProfile.entityUrn || '').replace('urn:li:fs_miniProfile:', ''),
});

export const getProfilesFromResponse = <T extends { included: (LinkedInMiniProfile | { $type: string })[] }>(
  response: T,
): Record<ProfileId, MiniProfile> => {
  const miniProfiles = filter(response.included, p => p.$type === MINI_PROFILE_TYPE) as LinkedInMiniProfile[];

  const transformedMiniProfiles = miniProfiles.map((miniProfile: LinkedInMiniProfile) => transformMiniProfile(miniProfile));

  return keyBy(transformedMiniProfiles, 'profileId');
};

export class ProfileRepository {
  private client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  async getProfile({ publicIdentifier }: { publicIdentifier: string }): Promise<Profile> {
    const response = await this.client.request.profile.getProfile({ publicIdentifier });

    const results = response.included || [];

    const profile = results.find(r => r.$type === PROFILE_TYPE && r.publicIdentifier === publicIdentifier) as LinkedInProfile;
    const company = results.find(r => r.$type === COMPANY_TYPE && profile.headline.includes(r.name)) as LinkedInCompany;
    const pictureUrls = getProfilePictureUrls(get(profile, 'profilePicture.displayImageReference.vectorImage', {}));

    return {
      ...profile,
      company,
      pictureUrls,
    };
  }

  async getProfile2({ publicIdentifier }: { publicIdentifier: string }):Promise<any> {
    const response = await this.client.request.profile.getProfile2({ publicIdentifier });
    const results = response.included || [];
    const country = results.find(r => r.$type === "com.linkedin.voyager.dash.common.Geo" )?.[0] ;
    const profile = results.find(r => r.$type === PROFILE_TYPE && r.publicIdentifier === publicIdentifier) as LinkedInProfile;
    const memberRelationShip = results.find(r => r.$type === "com.linkedin.voyager.dash.relationships.MemberRelationship" )
    const inviteeMember = results.find(r => r.$type === "com.linkedin.voyager.dash.relationships.invitation.Invitation" )
    const company = results.find(r => r.$type === "com.linkedin.voyager.dash.identity.profile.Position");

    return {
      ...profile,
      country,
      memberRelationShip,
      inviteeMember,
      company
    }
  }

  async getOwnProfile(): Promise<Profile | null> {
    const response = await this.client.request.profile.getOwnProfile();

    const miniProfile = response?.included?.find(r => r.$type === MINI_PROFILE_TYPE);

    if (!miniProfile) {
      return null;
    }

    return this.getProfile(miniProfile);
  }

  async getFullProfile({ publicIdentifier }: { publicIdentifier: string }):Promise<any>{
    return  this.client.request.profile.getFullProfile({account: publicIdentifier})
  }
}
