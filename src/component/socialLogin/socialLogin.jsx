import React, { useCallback, useState, useEffect } from "react";
// import { FacebookProvider, LoginButton } from "react-facebook";
import FBicon from "../../../src/assets/icons8-facebook-48.png";
import LinkedInicon from "../../../src/assets/icons8-linkedin-48.png";
import Twittericon from "../../../src/assets/icons8-twitterx-48.png";
import FacebookLogin from "react-facebook-login";
import {
  GenerateLongLiveAccessToken,
  StoreLinkedInDetail,
  StoreTwitterUserDetails,
  getFacebookUserDetails,
  getLinkedInUserDetails,
  getTwitterUserDetails,
  getFacebookUserDelete,
  getLinkedInUserDelete,
  getTwitterUserDelete,
} from "../../services/serviceFile";

import { LoginSocialLinkedin, LoginSocialTwitter } from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import {
  LinkedInLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";
import Sidebar from "../sidebar/Sidebar";
import "./socialLogin.css";
import { GetUserData } from "../../services/storage";
import { CircularProgress } from "@mui/material";

const REDIRECT_URI = window.location.href;

console.log(REDIRECT_URI, "redirect");

export default function LoginButton() {
  const [facebookLoggedIn, setFacebookLoggedIn] = useState({});
  const [linkedInLoggedIn, setLinkedInLoggedIn] = useState({});
  const [fBAccessTokenExpiredorNot, setFBAccessTokenExpiredorNot] =
    useState("");
  const [twitterLoggedIn, setTwitterLoggedIn] = useState({});
  const [isLoadingFlag, setIsLoadingFlag] = useState(true);

  // useEffect(() => {
  //   FacebookLogin.init();
  // }, []);
  let email = GetUserData().email;
  useEffect(() => {
    Promise.all([
      getFacebookUserDetails(email),
      getLinkedInUserDetails(email),
      getTwitterUserDetails(email),
    ])
      .then((value) => {
        let [faceBookResponse, linkedInResponse, twitterResponse] = [...value];
        if (faceBookResponse.data) {
          setFBAccessTokenExpiredorNot(faceBookResponse.data.tokenStatus);
          setFacebookLoggedIn(faceBookResponse.data.data.data);
        }
        if (linkedInResponse.data) {
          setLinkedInLoggedIn(linkedInResponse.data.data);
        }
        if (twitterResponse.data) {
          setTwitterLoggedIn(twitterResponse.data.data);
        } else {
          console.log(twitterResponse);
        }
        setIsLoadingFlag(false);
        console.log("PROMISE-ALL");
        console.log(value);
      })
      .catch((error) => {
        console.log(error.response.data.Error);
      });
  }, [email]);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const handleFBLogout = () => {
    getFacebookUserDelete(email).then((res) => {
      setFacebookLoggedIn({});
      console.log(res, "response delete 62");
    });
    alert("logout");
  };

  const handleLinkedInLogout = () => {
    getLinkedInUserDelete(email).then((res) => {
      setLinkedInLoggedIn({});
      console.log(res, "response delete 62");
    });
    alert("logout");
  };
  const handleTwitterLogout = () => {
    getTwitterUserDelete(email).then((res) => {
      setTwitterLoggedIn({});
      console.log(res, "response delete 62");
    });
    alert("logout");
  };
  // twitter api
  const responseTwitterApi = async (authData) => {
    console.log(authData, "data");
    let TwitterUserDetails = {
      accessToken: authData.data.access_token,
      expiresIn: authData.data.expires_in,
      refreshToken: authData.data.refresh_token,
      createdBy: GetUserData().email,
    };
    try {
      const twitterUser = await StoreTwitterUserDetails(TwitterUserDetails);
      if (twitterUser && twitterUser.data) {
        setTwitterLoggedIn(twitterUser.data);
      }
      console.log(twitterUser, "twitter 64");
    } catch (error) {
      console.log(error, "twitter error 76");
    }
  };

  // linkedin api
  const responseLinkedIn = async (authData) => {
    console.log(
      authData,
      authData.data.access_token,
      authData.data.expires_in,
      "cheking"
    );
    let LinekedInUserDetails = {
      accessToken: authData.data.access_token,
      expiresIn: authData.data.expires_in,
      createdBy: GetUserData().email,
    };
    try {
      const response = await StoreLinkedInDetail(LinekedInUserDetails);
      if (response && response.data) {
        console.log(response.data, "linked d 128");
        setLinkedInLoggedIn(response.data);
      }
      console.log(response, "linked details");
    } catch (error) {
      console.log(error);
    }
  };

  // facebook and instagram api
  const responseFacebook = async (responseValue) => {
    console.log(responseValue.id);
    console.log(responseValue);
    try {
      localStorage.setItem("email", responseValue.email);
      let userDetail = {
        name: responseValue.name,
        email: responseValue.email,
        shortLivedAccessToken: responseValue.accessToken,
        user_id: responseValue.userID,
        createdBy: GetUserData().email,
      };
      const response = await GenerateLongLiveAccessToken(userDetail);
      if (response && response.data) {
        setFacebookLoggedIn(response.data);
      }
      console.log(response, "login reponse");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log(error);
  };

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Sidebar>
      <div style={styles}>
        <div style={{ display: "grid" }}>
          <div>
            <h1 style={{ textAlign: "center" }}>Social Auth</h1>
          </div>
          <br />
          {isLoadingFlag ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <div>
              {facebookLoggedIn &&
              facebookLoggedIn.name &&
              fBAccessTokenExpiredorNot !== "valid" ? (
                <div className="socialUserInfo">
                  <div className="card">
                    <img src={FBicon} alt="Card_Image" className="card-image" />
                    <div className="card-content">
                      <h2 className="card-title">{facebookLoggedIn.name}</h2>
                    </div>
                    <button
                      className="card-button"
                      type="submit"
                      onClick={handleFBLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <FacebookLogin
                    appId={process.env.REACT_APP_Facebook_APP_ID || ""}
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="email,pages_read_engagement,pages_show_list,
                  pages_manage_posts,
                  pages_manage_engagement,publish_video,instagram_manage_events,instagram_content_publish,instagram_basic,ads_management"
                    callback={responseFacebook}
                    onLoginStart={onLoginStart}
                    onFailure={handleLoginFailure}
                    cssClassName="kep-login-facebook"
                  />
                </div>
              )}
              {linkedInLoggedIn &&
              linkedInLoggedIn.name &&
              linkedInLoggedIn.LinkedAccessToken !== "null" ? (
                <div className="socialUserInfo" style={{ marginTop: "20px" }}>
                  <div className="card">
                    <img
                      src={LinkedInicon}
                      alt="Card_Image"
                      className="card-image"
                    />
                    <div className="card-content">
                      <h2 className="card-title">{linkedInLoggedIn.name}</h2>
                    </div>
                    <button
                      className="card-button"
                      type="submit"
                      onClick={handleLinkedInLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <LoginSocialLinkedin
                    isOnlyGetToken
                    client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ""}
                    client_secret={
                      process.env.REACT_APP_LINKEDIN_APP_SECRET || ""
                    }
                    redirect_uri={REDIRECT_URI}
                    onLoginStart={onLoginStart}
                    scope="openid,profile,w_member_social,email"
                    onResolve={responseLinkedIn}
                    onReject={(err) => {
                      console.log(err);
                    }}
                  >
                    <LinkedInLoginButton
                      style={{
                        height: 60,
                        width: 310,
                        alignItems: "center",
                        padding: "3px 40px",
                      }}
                    />
                  </LoginSocialLinkedin>
                </div>
              )}
              {twitterLoggedIn &&
              twitterLoggedIn.name &&
              twitterLoggedIn.TwitterAccessToken !== "null" ? (
                <div className="socialUserInfo" style={{ marginTop: "20px" }}>
                  <div className="card">
                    <img
                      src={Twittericon}
                      alt="Card_Image"
                      className="card-image"
                    />
                    <div className="card-content">
                      <h2 className="card-title">{twitterLoggedIn.name}</h2>
                    </div>
                    <button
                      className="card-button"
                      type="submit"
                      onClick={handleTwitterLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <LoginSocialTwitter
                    isOnlyGetToken
                    client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ""}
                    // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ""}
                    redirect_uri={REDIRECT_URI}
                    onLoginStart={onLoginStart}
                    // fields="created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld"
                    // state="state"
                    scope="users.read tweet.read tweet.write offline.access"
                    onResolve={responseTwitterApi}
                    onReject={(err) => {
                      console.log(err);
                    }}
                  >
                    <TwitterLoginButton
                      style={{
                        height: 60,
                        width: 320,
                        alignItems: "center",
                        padding: "3px 40px",
                      }}
                    />
                  </LoginSocialTwitter>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
