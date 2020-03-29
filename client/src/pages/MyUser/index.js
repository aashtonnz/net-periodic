import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { faCog as cogIcon } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../actions/auth";
import { setAlert } from "../../actions/page";
import { createPost } from "../../actions/post";
import { setMyProfile } from "../../actions/profile";
import Profile from "../../views/Profile";
import { Input, Link, PrimaryButton } from "../../views/styled";
import {
  SubHeader,
  Divider,
  ContentWrapper,
  PopularTopics,
  SettingsIcon,
  ButtonWrapper,
  EditButton,
  LogoutButton,
  Wrapper
} from "./styled";
import Subscriptions from "./Subscriptions";
import FollowedTopics from "./FollowedTopics";
import Posts from "./Posts";
import { nextPublishDate, trimValues } from "../../utils";
import { checkPost } from "../../utils/validation";

const MyUser = ({ logout, setAlert, createPost, myProfile, setMyProfile }) => {
  const history = useHistory();
  const [post, setPost] = useState({ title: "", link: "", topics: "" });
  const [countSec, setCountSec] = useState(
    nextPublishDate().diff(moment().utc(), "seconds")
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCountSec = nextPublishDate().diff(moment().utc(), "seconds");
      if (countSec > newCountSec) {
        setCountSec(newCountSec);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countSec, setCountSec]);

  useEffect(() => {
    if (!myProfile) {
      setMyProfile();
    }
  }, [myProfile, setMyProfile]);

  const duration = moment.duration(countSec, "seconds");

  const onPostChange = event =>
    setPost({ ...post, [event.target.name]: event.target.value });

  const onPostSubmit = () => {
    trimValues(post);
    const { title, link, topics } = post;
    const invalidMsg = checkPost(title, link, topics);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      createPost(post);
    }
  };

  return !myProfile ? null : (
    <Wrapper>
      <Profile {...myProfile} />
      <ButtonWrapper>
        <EditButton onClick={() => history.push("/edit")}>
          <SettingsIcon icon={cogIcon} />
          Edit
        </EditButton>
        <LogoutButton onClick={() => logout(history)}>Logout</LogoutButton>
      </ButtonWrapper>
      <Divider />
      <SubHeader>
        Publishing in {duration.days() * 24 + duration.hours()} hr{" "}
        {duration.minutes() + " "} min {duration.seconds() + " "}
        sec
      </SubHeader>
      {!myProfile.pendingPost ? (
        <>
          <PopularTopics>
            See <Link to="/topics">popular topics</Link>
          </PopularTopics>
          <ContentWrapper>
            <Input
              name="title"
              value={post.title}
              type="text"
              placeholder="Title"
              onChange={onPostChange}
            />
            <Input
              name="link"
              value={post.link}
              type="text"
              placeholder="Link"
              onChange={onPostChange}
            />
            <Input
              name="topics"
              value={post.topics}
              type="text"
              placeholder="science, politics, culture"
              onChange={onPostChange}
            />
            <PrimaryButton onClick={onPostSubmit}>Submit</PrimaryButton>
          </ContentWrapper>
        </>
      ) : (
        <Posts posts={[myProfile.pendingPost]} canRemove notLikeable />
      )}
      <Divider />
      {!!myProfile.posts.length && (
        <>
          <SubHeader>Published</SubHeader>
          <Posts {...myProfile} showPublishDate canRemove />
          <Divider />
        </>
      )}
      {!!myProfile.likedPosts.length && (
        <>
          <SubHeader>Bookmarked</SubHeader>
          <Posts posts={myProfile.likedPosts} showPublishDate />
          <Divider />
        </>
      )}
      <SubHeader>My Subscriptions & Topics</SubHeader>
      <PopularTopics>
        See <Link to="/topics">popular topics</Link>
      </PopularTopics>
      <ContentWrapper>
        {!!myProfile.subscribedTo.length && (
          <Subscriptions {...myProfile} canRemove />
        )}
        {!!myProfile.followedTopics.length && (
          <FollowedTopics {...myProfile} canRemove />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

MyUser.propTypes = {
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  setMyProfile: PropTypes.func.isRequired,
  myProfile: PropTypes.object
};

const mapStateToProps = state => ({
  myProfile: state.profile.myProfile
});

export default connect(mapStateToProps, {
  logout,
  setAlert,
  createPost,
  setMyProfile
})(MyUser);
