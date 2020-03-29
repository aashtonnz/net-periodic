import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Post from "../../views/Post";
import { ListWrapper } from "./styled";
import { ShowMoreButton } from "../../pages/Home/styled";

const NUM_DISPLAYED_INIT = 1;
const NUM_DISPLAYED_INTERVAL = 3;

const Posts = ({
  posts,
  showPublishDate = false,
  canRemove = false,
  notLikeable = false,
  username = null
}) => {
  const [numDisplayed, setNumDisplayed] = useState(NUM_DISPLAYED_INIT);

  return (
    <ListWrapper>
      {posts.slice(0, numDisplayed).map((post, index) => (
        <Post
          key={index}
          {...post}
          showPublishDate={showPublishDate}
          canRemove={canRemove}
          notLikeable={notLikeable}
          username={username}
        />
      ))}
      {numDisplayed < posts.length && (
        <ShowMoreButton
          onClick={() => setNumDisplayed(numDisplayed + NUM_DISPLAYED_INTERVAL)}
        >
          Show{" "}
          {posts.length > numDisplayed + NUM_DISPLAYED_INTERVAL
            ? numDisplayed + NUM_DISPLAYED_INTERVAL
            : posts.length}{" "}
          of {posts.length}
        </ShowMoreButton>
      )}
    </ListWrapper>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  showPublishDate: PropTypes.bool,
  canRemove: PropTypes.bool,
  notLikeable: PropTypes.bool,
  username: PropTypes.string
};

export default connect(null, {})(Posts);
