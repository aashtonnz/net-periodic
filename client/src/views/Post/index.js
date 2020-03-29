import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import prependHttp from "prepend-http";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { faStar as likeIcon } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as solidLikeIcon,
  faTimesCircle as deleteIcon
} from "@fortawesome/free-solid-svg-icons";
import { likePost, unlikePost, deletePost } from "../../actions/post";
import {
  Wrapper,
  TitleBox,
  PostLink,
  UserImg,
  TopicLink,
  Title,
  DeleteIcon
} from "./styled";
import { UserLink } from "../styled";
import LikeIcon from "./LikeIcon";
import { publishDate } from "../../utils";
import { fileHost } from "../../utils/constants";

const Post = ({
  _id,
  title,
  link: initialLink,
  myProfile,
  likePost,
  unlikePost,
  profile,
  topics,
  numLikes,
  createdAt,
  showPublishDate = false,
  canRemove = false,
  notLikeable = false,
  deletePost,
  username = null
}) => {
  const link = prependHttp(initialLink);
  const history = useHistory();
  const [liked, setLiked] = useState(
    !!myProfile && myProfile.likedPosts.map(post => post._id).includes(_id)
  );

  useEffect(() => {
    setLiked(
      !!myProfile && myProfile.likedPosts.map(post => post._id).includes(_id)
    );
  }, [myProfile, setLiked, _id]);

  const onLikePost = () => {
    if (!myProfile) {
      history.push("/login");
      return;
    }
    if (!liked) {
      likePost(_id, username);
      return;
    }
    unlikePost(_id, username);
  };

  return (
    <Wrapper>
      {showPublishDate && <p>{publishDate(createdAt).format("MMM D")}</p>}
      <div>
        {profile && (
          <Link to={`/user/${profile.user.username}`}>
            <UserImg src={`${fileHost}/${profile.imgPath}`} />
          </Link>
        )}
      </div>
      <TitleBox>
        {!notLikeable && (
          <span onClick={onLikePost}>
            <LikeIcon
              icon={liked ? solidLikeIcon : likeIcon}
              liked={liked}
              numLikes={numLikes}
            />
          </span>
        )}
        <Title href={link} target="_blank">
          {title}
        </Title>
      </TitleBox>
      <div>
        <PostLink href={link} target="_blank">
          {new URL(link).hostname}
        </PostLink>
      </div>
      {profile && (
        <>
          <UserLink to={`/user/${profile.user.username}`}>
            {profile.user.name} @{profile.user.username}
          </UserLink>
        </>
      )}
      <div>
        {topics.map((topic, index) => (
          <Fragment key={index}>
            <TopicLink to={`/topic/${topic}`}>{topic}</TopicLink>
            {index !== topics.length - 1 && ""}
          </Fragment>
        ))}
      </div>
      {canRemove && (
        <span onClick={() => deletePost(_id, title)}>
          <DeleteIcon icon={deleteIcon} />
        </span>
      )}
    </Wrapper>
  );
};

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  numLikes: PropTypes.number.isRequired,
  deletePost: PropTypes.func.isRequired,
  showPublishDate: PropTypes.bool,
  canRemove: PropTypes.bool,
  notLikeable: PropTypes.bool,
  createdAt: PropTypes.string,
  myProfile: PropTypes.object,
  profile: PropTypes.object,
  username: PropTypes.string
};

const mapStateToProps = state => ({
  myProfile: state.profile.myProfile
});

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(
  Post
);
