import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setProfile,
  setMyProfile,
  subscribe,
  unsubscribe
} from "../actions/profile";
import Profile from "../views/Profile";
import Subscriptions from "./MyUser/Subscriptions";
import FollowedTopics from "./MyUser/FollowedTopics";
import Posts from "./MyUser/Posts";
import { Divider, SubHeader, ContentWrapper, Wrapper } from "./MyUser/styled";
import { Button, PrimaryButton } from "../views/styled";

const User = ({
  setProfile,
  setMyProfile,
  subscribe,
  unsubscribe,
  isAuthenticated,
  profile,
  myProfile
}) => {
  const { username } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      setMyProfile();
    }
    setProfile(username, history);
  }, [isAuthenticated, setMyProfile, setProfile, username, history]);

  const onSubscribe = () => {
    isAuthenticated ? subscribe(username, history) : history.push("/login");
  };

  const onUnsubscribe = () => {
    unsubscribe(username, history);
  };

  return !profile ? null : (
    <Wrapper>
      <Profile {...profile} />
      {myProfile &&
      myProfile.subscribedTo.find(
        contributor => contributor.username === username
      ) ? (
        <Button onClick={onUnsubscribe}>Unsubscribe</Button>
      ) : (
        <PrimaryButton onClick={onSubscribe}>Subscribe</PrimaryButton>
      )}
      {!!profile.posts.length && (
        <>
          <Divider />
          <SubHeader>Published</SubHeader>
          <Posts {...profile} showPublishDate username={username} />
        </>
      )}
      {!!profile.likedPosts.length && (
        <>
          <Divider />
          <SubHeader>Bookmarked</SubHeader>
          <Posts posts={profile.likedPosts} showPublishDate />
        </>
      )}
      <Divider />
      <SubHeader>User's Subscriptions & Topics</SubHeader>
      <ContentWrapper>
        {!!profile.subscribedTo.length && <Subscriptions {...profile} />}
        {!!profile.followedTopics.length && <FollowedTopics {...profile} />}
      </ContentWrapper>
    </Wrapper>
  );
};

User.propTypes = {
  setProfile: PropTypes.func.isRequired,
  setMyProfile: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  myProfile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isAuthenticated: state.auth.isAuthenticated,
  myProfile: state.profile.myProfile
});

export default connect(mapStateToProps, {
  setProfile,
  setMyProfile,
  subscribe,
  unsubscribe
})(User);
