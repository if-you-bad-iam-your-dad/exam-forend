import Axios from "axios";

export const LoginServiceApi = (userName,password) => {
  const LoginUrl = process.env.REACT_APP_BACKEND_URL + `auth/login`;
  const data = {
     user_name: userName,
     password: password
  }
  const headers = {
    "Content-Type": "application/json",
  }
  return Axios.post(LoginUrl,data,{headers: headers});
}

export const SocialMediaUploadImageApi = (formData) => {
    const SocialMediaUploadImageUrl =
      process.env.REACT_APP_BACKEND_URL + `api/upload/`;
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    return Axios.post(SocialMediaUploadImageUrl, formData, { headers: headers });
  };

  export const GenerateLongLiveAccessToken = (user_detail) => {
    const FacebookUploadImageUrl =
      process.env.REACT_APP_BACKEND_URL + `api/long_lived_access_token/`;
      const data = {
        name : user_detail.name,
        email : user_detail.email,
        Long_lived_access_token : user_detail.shortLivedAccessToken,
        user_id : user_detail.user_id,
        created_by : user_detail.createdBy,
      }
    const headers = {
      "Content-Type": "application/json",
    };
    return Axios.post(FacebookUploadImageUrl, data, { headers: headers });
  };
  

export const CreateSocialMediaPostAPI = (postDetails) => {
  const SocialMediaPostApiUrl =
    process.env.REACT_APP_BACKEND_URL + `api/create/`;
  const data = {
    content: postDetails.content,
    linkedInImageAssetValue : postDetails.linkedIn_image_assetValue,
    linkedInVideoAssetValue : postDetails.linkedIn_video_assetValue,
    twitterImageMediaId : postDetails.twitter_image_mediaId,
    twitterVideoMediaId : postDetails.twitter_video_mediaId,
    fb_media_id : postDetails.fbMediaId,
    igCreationId: postDetails.igCreationId,
    created_by : postDetails.created_by,
    isChecked : postDetails.ischecked
    
  };
  console.log(data,'data 53')
  const headers = {
    "Content-Type": "application/json",
  };
  return Axios.post(SocialMediaPostApiUrl, data, { headers: headers });
};

export const StoreLinkedInDetail = (user_detail) => {
    const StoreLinkedInDetailUrl = process.env.REACT_APP_BACKEND_URL + `api/linked_create/`
    const data ={
      LinkedAccessToken : user_detail.accessToken,
      LinkedAccessTokenExpires : user_detail.expiresIn,
      created_by : user_detail.createdBy
    }
    const headers = {
      "Content-Type": "application/json",
    };
    return Axios.post(StoreLinkedInDetailUrl,data,{headers: headers});
}

export const StoreTwitterUserDetails = (user_detail) => {
  console.log(user_detail)
    const StoreTwitterUserUrl = process.env.REACT_APP_BACKEND_URL + `api/twitter_create/`
    const data ={
      TwitterAccessToken : user_detail.accessToken,
      TwitterRefreshToken : user_detail.refreshToken,
      TwitterAccessTokenExpires : user_detail.expiresIn,
      created_by : user_detail.createdBy
    }
    const headers = {
      "Content-Type": "application/json",
    };
    return Axios.post(StoreTwitterUserUrl,data,{headers: headers});
}

export const getFacebookUserDetails = async (email) => {
  const FacebookUserDetailsUrl = process.env.REACT_APP_BACKEND_URL + `api/fb_user_detail/${email}`
  
  const headers = {
    "Content-Type": "application/json",
  }
  return await Axios.get(FacebookUserDetailsUrl,{headers: headers});
}

export const getLinkedInUserDetails = async (email) => {
  const LinkedInUserDetailsUrl = process.env.REACT_APP_BACKEND_URL + `api/lin_user_detail/${email}`
  
  const headers = {
    "Content-Type": "application/json",
  }
  return await Axios.get(LinkedInUserDetailsUrl,{headers: headers});
}

export const getTwitterUserDetails = async (email) => {
  const TwitterUserDetailsUrl = process.env.REACT_APP_BACKEND_URL + `api/tweet_user_detail/${email}`
  
  const headers = {
    "Content-Type": "application/json",
  }
  return await Axios.get(TwitterUserDetailsUrl,{headers: headers});
}

export const getFacebookUserDelete = async (email) => {
  const FacebookUserDeleteUrl = process.env.REACT_APP_BACKEND_URL + `api/fb_user_delete/${email}`
  
  const headers = {
    "Content-Type": "application/json",
  }
  return await Axios.delete(FacebookUserDeleteUrl,{headers: headers});
}

export const getLinkedInUserDelete = async (email) => {
  const LinkedInUserDeleteUrl = process.env.REACT_APP_BACKEND_URL + `api/lin_user_delete/${email}`
  
  const headers = {
    "Content-Type": "application/json",
  }
  return await Axios.delete(LinkedInUserDeleteUrl,{headers: headers});
}

export const getTwitterUserDelete = async (email) => {
  const TwitterUserDeleteUrl = process.env.REACT_APP_BACKEND_URL + `api/tweet_user_delete/${email}`
  
  const headers = {
    "Content-Type": "application/json",
  }
  return await Axios.delete(TwitterUserDeleteUrl,{headers: headers});
}




