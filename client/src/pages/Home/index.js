import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Post from "../../views/Post";
import { setAllPosts, setSubscribedPosts } from "../../actions/post";
import { setMyProfile } from "../../actions/profile";
import { setDefaultTopics } from "../../actions/topic";
import Select from "../../views/Select";
import { Option } from "../../views/Select/styled";
import { Wrapper, FilterBox, ShowMoreButton, NoPostsMsg } from "./styled";

const NUM_DISPLAYED_INTERVAL = 5;

const Home = ({
  allPosts,
  setAllPosts,
  subscribedPosts,
  setSubscribedPosts,
  setMyProfile,
  setDefaultTopics,
  isAuthenticated,
  defaultTopics,
  myProfile
}) => {
  const [numDisplayed, setNumDisplayed] = useState(NUM_DISPLAYED_INTERVAL);
  const [listType, setListType] = useState("all");
  const [topic, setTopic] = useState("all");
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated && !myProfile) {
      setMyProfile();
    }
  }, [isAuthenticated, myProfile, setMyProfile]);

  useEffect(() => {
    setAllPosts();
    setDefaultTopics();
    if (isAuthenticated) {
      setSubscribedPosts();
    }
  }, [setAllPosts, setDefaultTopics, setSubscribedPosts, isAuthenticated]);

  const onListTypeSelect = newListType => {
    if (newListType === "subscribed" && !isAuthenticated) {
      history.push("/login");
      return;
    }
    setListType(newListType);
  };

  const posts = listType === "all" ? allPosts : subscribedPosts;

  return !posts ? null : (
    <Wrapper>
      <FilterBox>
        <Select value={listType} onChange={onListTypeSelect}>
          <Option value="all">Leading</Option>
          <Option value="subscribed">Subscribed</Option>
        </Select>
        <Select value={topic} onChange={setTopic} showSelected>
          {[
            <Option key="all" value="all">
              All topics
            </Option>
          ].concat(
            !myProfile
              ? defaultTopics &&
                  defaultTopics.sort().map((topic, index) => (
                    <Option key={index} value={topic}>
                      {topic}
                    </Option>
                  ))
              : myProfile.followedTopics.sort().map((topic, index) => (
                  <Option key={index} value={topic}>
                    {topic}
                  </Option>
                ))
          )}
        </Select>
      </FilterBox>
      {posts.length ? (
        <>
          {posts
            .filter(post => topic === "all" || post.topics.includes(topic))
            .slice(0, numDisplayed)
            .map((post, index) => (
              <Fragment key={index}>
                <Post {...post} />
              </Fragment>
            ))}
          {numDisplayed < posts.length && (
            <ShowMoreButton
              onClick={() =>
                setNumDisplayed(numDisplayed + NUM_DISPLAYED_INTERVAL)
              }
            >
              Show{" "}
              {posts.length > numDisplayed + NUM_DISPLAYED_INTERVAL
                ? numDisplayed + NUM_DISPLAYED_INTERVAL
                : posts.length}{" "}
              of {posts.length}
            </ShowMoreButton>
          )}
        </>
      ) : (
        <NoPostsMsg>-</NoPostsMsg>
      )}
    </Wrapper>
  );
};

Home.propTypes = {
  allPosts: PropTypes.array,
  subscribedPosts: PropTypes.array,
  setAllPosts: PropTypes.func.isRequired,
  setSubscribedPosts: PropTypes.func.isRequired,
  setMyProfile: PropTypes.func.isRequired,
  setDefaultTopics: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  myProfile: PropTypes.object
};

const mapStateToProps = state => ({
  allPosts: state.post.all,
  subscribedPosts: state.post.subscribed,
  isAuthenticated: state.auth.isAuthenticated,
  myProfile: state.profile.myProfile,
  defaultTopics: state.topic.defaults
});

export default connect(mapStateToProps, {
  setAllPosts,
  setSubscribedPosts,
  setMyProfile,
  setDefaultTopics
})(Home);
