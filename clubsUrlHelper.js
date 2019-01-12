const GetPageInfoPath = (type) => {
    let url = document.location.href.split('#')[0];
    let locale = url.split('/')[4];

    return `/club/${locale}/settings/club/${type}`;
};

const OnFormSubmitPath = (type) => {
    let url = document.location.href.split('#')[0];
    let locale = url.split('/')[4];

    return `/club/${locale}/settings/club/${type}`;
};

const ClubSettingsLink = (code) => {
    let url = document.location.href.split('#')[0];
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/item/${code}`
};

const EditClubGetPageInfoPath = (type) => {
    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/edit/${code}/${type}`
};

const EditClubOnFormSubmitPath = (type) => {
    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/save/${code}/${type}`
};

const PhotoClubOnFormSubmitPath = () => {
    let url = document.location.href.split('#')[0];
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/save`
};

const EditParticipantsTabPath = () => {
    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/members/${code}`;
};
const SaveParticipantsTabPath = () => {
    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/members/save/${code}`;
};

const EditClubEventTabPath = () => {
    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/event/${code}`;
};

const SetClubEventTabPath = () => {
    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/event/set/${code}`;
};

const UnsetClubEventTabPath = () => {
    let url = document.location.href.split('#')[0];
    let code = url.split('/').pop();
    let locale = url.split('/')[4];
    return `/club/${locale}/settings/club/event/unset/${code}`;
    ///api/v1/settings/{lang}/club/event/unset/{code}
};

const DomainClubCheckPath = () => {
  let url = document.location.href.split('#')[0];
  let locale = url.split('/')[4];
  return `/club/${locale}/settings/club/domain/check`
};

const DomainClubCreatePath = () => {
  let url = document.location.href.split('#')[0];
  let code = url.split('/').pop();
  let locale = url.split('/')[4];
  return `/club/${locale}/settings/club/domain/create/${code}`;
};


export const UPLOAD_CLUB_PHOTO = '/media/upload/club-main';
export const UPLOAD_CLUB_STAGES_PHOTO = '/media/upload/club-stage';
///api/v1/settings/{lang}/club/event/set/{code}
///api/v1/settings/{lang}/club/event/unset/{code}

///api/v1/settings/ru/club/domain/create/{code}

///api/v1/settings/{lang}/club/event/{code}
///v1/settings/{lang}/club/members/save/{code}
///api/v1/settings/{lang}/club/domain/check

///api/v1/settings/{lang}/club/save/{code}/{type}
///api/v1/settings/{lang}/club/edit/{code}/{type}
///api/v1/settings/{lang}/club/edit/{code}/{type} type - photo
///api/v1/settings/media/upload/photo/{type} type - club-main
///media/upload/ - всегда при загрузке любых фото
//club-stages - это тип о котором надо договариваться
///api/v1/settings/{lang}/club/save/{code}/{type} type - photo
///api/v1/settings/{lang}/club/save/{code}/{type} type - video
///api/v1/settings/{lang}/club/members/list/{code}
///club/{locale}/settings/club/members/{code} memebers-tab
///api/v1/settings/{lang}/club/edit/{code}/{type}type - stages
///api/v1/settings/profile/get/notify/list/{lang}


export {
  GetPageInfoPath,
  OnFormSubmitPath,
  ClubSettingsLink,
  EditClubGetPageInfoPath,
  EditClubOnFormSubmitPath,
  PhotoClubOnFormSubmitPath,
  EditParticipantsTabPath,
  SaveParticipantsTabPath,
  EditClubEventTabPath,
  SetClubEventTabPath,
  UnsetClubEventTabPath,
  DomainClubCheckPath,
  DomainClubCreatePath

};