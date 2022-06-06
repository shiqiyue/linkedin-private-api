import {LinkedInRequest} from '../core/linkedin-request';
import {GetOwnProfileResponse} from '../responses/own-profile.response.get';
import {GetProfileResponse} from '../responses/profile.response.get';

const LI_CDN = 'https://media-exp2.licdn.com/media'

export class ProfileRequest {
    private request: LinkedInRequest;

    constructor({request}: { request: LinkedInRequest }) {
        this.request = request;
    }

    getProfile({publicIdentifier}: { publicIdentifier: string }): Promise<GetProfileResponse> {
        const queryParams = {
            q: 'memberIdentity',
            memberIdentity: encodeURIComponent(publicIdentifier),
            decorationId: 'com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-35',
        };

        return this.request.get<GetProfileResponse>('identity/dash/profiles', {
            params: queryParams,
        });
    }


    getOwnProfile(): Promise<GetOwnProfileResponse> {
        return this.request.get<GetOwnProfileResponse>('me');
    }

    getFullProfile({account}: { account: string }):Promise<any> {
        if (!account) {
            throw new Error('a public account is required')
        }
        const resources = ['profileView', 'profileContactInfo', 'highlights']
        return Promise.all(resources.map(resource => this._fetchProfileResource({account, resource})))
            .then((responses) => {
                const fullProfile = {account}
                responses.map(res => Object.assign(fullProfile, res))
                //console.log(fullProfile)

                return Promise.resolve(this._scrubFullProfileResponse({profile: fullProfile}))
            })
    }

    _fetchProfileResource({account, resource}: { account: string, resource: string }):Promise<any>  {
        let url = `/voyager/api/identity/profiles/${account}/`

        if (!resource) {
            url += 'profileView'
        } else {
            url += resource
        }
        const headers = Object.assign(this.request.request.defaults.headers, {
            accept: "*/*"
        });
        delete headers["x-restli-protocol-version"]
        delete headers["x-li-page-instance"]
        delete headers["x-li-track"]
        return this.request.get(url, {headers: headers})

    }

    _scrubFullProfileResponse({profile}: { profile: any }):any {
        const socialProfile = {
            source: 'LinkedIn',
            firstname: undefined,
            lastname: undefined,
            headline: undefined,
            industryName: undefined,
            summary: undefined,
            emailAddress: undefined,
            location: undefined,
            publicIdentifier: undefined,
            occupation: undefined,
            address: undefined,
            birthdate: undefined,
            phoneNumbers: undefined,
            twitterHandles: undefined,
            picture: undefined,
            education: undefined,
            patents: undefined,
            publications: undefined,
            projects: undefined,
            positions: undefined,
            languages: undefined,
            skills: undefined,
            websites: undefined

        }
        socialProfile.firstname = profile.profile.firstName || ''
        socialProfile.lastname = profile.profile.lastName || ''
        socialProfile.headline = profile.profile.headline || ''
        socialProfile.industryName = profile.profile.industryName || ''
        socialProfile.summary = profile.profile.summary || ''
        socialProfile.location = profile.profile.locationName || ''
        socialProfile.emailAddress = profile.emailAddress || ''
        socialProfile.publicIdentifier = profile.publicIdentifier
        socialProfile.occupation = profile.profile.miniProfile.occupation || ''
        socialProfile.address = profile.profile.address || ''
        socialProfile.birthdate = profile.birthDateOn || {}
        socialProfile.phoneNumbers = []
        socialProfile.twitterHandles = []
        socialProfile.picture = ''

        // eslint-disable-next-line no-prototype-builtins
        if (profile.hasOwnProperty('phoneNumbers')) {
            socialProfile.phoneNumbers = profile.phoneNumbers
        }

        // eslint-disable-next-line no-prototype-builtins
        if (profile.hasOwnProperty('twitterHandles')) {
            socialProfile.twitterHandles = profile.twitterHandles.map(twitter => twitter.name) || []
        }

        // eslint-disable-next-line no-prototype-builtins
        if (profile.profile.hasOwnProperty('pictureInfo') &&
            // eslint-disable-next-line no-prototype-builtins
            profile.profile.pictureInfo.hasOwnProperty('masterImage')) {
            socialProfile.picture = `${LI_CDN}${profile.profile.pictureInfo.masterImage}`
        }

        socialProfile.education = profile.educationView.elements.map(e => this._scrubEducationInfo(e)) || []
        socialProfile.patents = profile.patentView.elements.map(p => this._scrubPatentInfo(p)) || []
        socialProfile.publications = profile.publicationView.elements.map(p => this._scrubPublicationInfo(p)) || []
        socialProfile.projects = profile.projectView.elements.map(p => this._scrubProjectInfo(p)) || []
        socialProfile.positions = profile.positionView.elements.map(p => this._scrubPositionInfo(p)) || []
        socialProfile.languages = profile.languageView.elements.map(language => language.name) || []
        socialProfile.skills = profile.skillView.elements.map(skill => skill.name) || []
        // eslint-disable-next-line no-prototype-builtins
        if (profile.hasOwnProperty('websites') && profile.websites.length > 0) {
            socialProfile.websites = profile.websites.map(w => this._scrubWebsiteInfo(w)) || []
        }

        // there seems to be a bug with LinkedIns API where headline and occupation
        // are identical. Occupation should be current title at current company.
        if (socialProfile.headline === socialProfile.occupation) {
            const currentPositions = profile.positionView.elements
                // eslint-disable-next-line no-prototype-builtins
                .filter(p => p.hasOwnProperty('timePeriod') && p.timePeriod.hasOwnProperty('startDate') && !p.timePeriod.hasOwnProperty('endDate')) || []
            const currentPosition = currentPositions[0] || {}
            socialProfile.occupation = currentPosition.title || ''
        }

        return socialProfile
    }


    _scrubEducationInfo(education):any {
        const educationInfo = {
            activities: education.activities || '',
            degreeName: education.degreeName || '',
            fieldOfStudy: education.fieldOfStudy || '',
            timePeriod: education.timePeriod || {},
            schoolName: education.schoolName || '',
            school: undefined
        }

        // eslint-disable-next-line no-prototype-builtins
        if (education.hasOwnProperty('school')) {
            educationInfo.school = {
                active: education.school.active || false,
                name: education.school.schoolName || ''
            }
            // eslint-disable-next-line no-prototype-builtins
            if (education.school.hasOwnProperty('logo')) {
                educationInfo.school.logo = this._scrubPathToResource(education.school.logo)
            }
        }

        return educationInfo
    }

    _scrubPathToResource(resource) :any{
        if (resource.constructor !== Object) {
            return ''
        }

        const key = Object.keys(resource)[0]
        let resourcePath = resource[key].id || ''

        if (resourcePath) {
            resourcePath = `${LI_CDN}${resourcePath}`
        }

        return resourcePath
    }

    _scrubPositionInfo(position):any {
        let linkedInCompanyId = ''
        if (position.companyUrn) {
            const pieces = position.companyUrn.split(':')
            linkedInCompanyId = parseInt(pieces[pieces.length - 1], 10) + ''
        }

        const positionInfo = {
            locationName: position.locationName || '',
            companyName: position.companyName || '',
            linkedInCompanyId: linkedInCompanyId,
            description: position.description || '',
            timePeriod: position.timePeriod || {},
            title: position.title || '',
            company: undefined
        }
        // eslint-disable-next-line no-prototype-builtins
        if (position.hasOwnProperty('company')) {
            positionInfo.company = {
                employeeCountRange: position.company.employeeCountRange || {},
                industries: position.company.industries || []
            }
            // eslint-disable-next-line no-prototype-builtins
            if (position.company.hasOwnProperty('miniCompany') &&
                // eslint-disable-next-line no-prototype-builtins
                position.company.miniCompany.hasOwnProperty('logo')) {
                positionInfo.company.logo = this._scrubPathToResource(position.company.miniCompany.logo)
            }
        }
        return positionInfo
    }

    _scrubWebsiteInfo(website) :any{
        const categoryType = Object.keys(website.type)[0]
        return {
            website: website.url,
            type: website.type[categoryType].category || 'Portfolio'
        }
    }

    _scrubPublicationInfo(publication):any {
        const publicationInfo = {
            date: publication.date || {},
            description: publication.description || '',
            name: publication.name || '',
            publisher: publication.publisher || '',
            url: publication.url || '',
            authors: undefined
        }

        // eslint-disable-next-line no-prototype-builtins
        if (publication.hasOwnProperty('authors') && publication.authors.length > 0) {
            publicationInfo.authors = publication.authors.map(author => this._scrubMemberInfo(author))
        }

        return publicationInfo
    }

    _scrubMemberInfo(member):any {
        if (!member) {
            return {firstname: '', lastname: '', occupation: '', publicIdentifier: ''}
        }

        const memberInfo = {
            firstname: (member.member && member.member.firstName) ? member.member.firstName : '',
            lastname: (member.member && member.member.lastName) ? member.member.lastName : '',
            occupation: (member.member && member.member.occupation) ? member.member.occupation : '',
            publicIdentifier: (member.member && member.member.publicIdentifier) ? member.member.publicIdentifier : '',
            picture: undefined
        }

        // eslint-disable-next-line no-prototype-builtins
        if (member.member && member.member.hasOwnProperty('picture')) {
            memberInfo.picture = this._scrubPathToResource(member.member.picture)
        }
        return memberInfo
    }

    _scrubIdFromUrn(urn) :any{
        if (!urn) {
            return ''
        }

        const pieces = urn.split(':')
        return parseInt(pieces[pieces.length - 1], 10)
    }

    _scrubPatentInfo(patent) :any{
        const patentInfo = {
            applicationNumber: patent.applicationNumber || '',
            description: patent.description || '',
            filingDate: patent.filingDate || {},
            issueDate: patent.issueDate || {},
            number: patent.number || '',
            pending: patent.pending,
            title: patent.title || '',
            url: patent.url || '',
            inventors: undefined
        }

        // eslint-disable-next-line no-prototype-builtins
        if (patent.hasOwnProperty('inventors') && patent.inventors.length > 0) {
            patentInfo.inventors = patent.inventors
                // eslint-disable-next-line no-prototype-builtins
                .filter(inventor => inventor.hasOwnProperty('member'))
                .map(inventor => this._scrubMemberInfo(inventor.member))
        }
        return patentInfo
    }

    _scrubProjectInfo(project) {
        const projectInfo = {
            description: project.description || '',
            timePeriod: project.timePeriod || {},
            title: project.title || '',
            url: project.url || ''
        }

        // eslint-disable-next-line no-prototype-builtins
        if (project.hasOwnProperty('members') && project.members.length > 0) {
            project.members = project.members.map(member => this._scrubMemberInfo(member))
        }
        return projectInfo
    }
}
