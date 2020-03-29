import React from "react";
import PropTypes from "prop-types";
import { UnlikedIcon, LikedIcon, NumLikes } from "./styled";

const LikeIcon = ({ icon, liked, numLikes }) => {
  return (
    <>
      {<NumLikes>{numLikes ? numLikes : ""}</NumLikes>}
      {liked ? <LikedIcon icon={icon} /> : <UnlikedIcon icon={icon} />}
    </>
  );
};

LikeIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
  numLikes: PropTypes.number.isRequired
};

export default LikeIcon;
