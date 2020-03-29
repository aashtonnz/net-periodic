import React from "react";
import PropTypes from "prop-types";
import { faLink as linkIcon } from "@fortawesome/free-solid-svg-icons";
import {
  Header,
  Username,
  UserImg,
  NumSubscribed,
  LinkIcon,
  Wrapper
} from "./styled";
import { A } from "../styled";
import { trimProtocol } from "../../utils";
import { fileHost } from "../../utils/constants";

const Profile = ({ imgPath, user, numSubscribed, bio, link }) => {
  return (
    <Wrapper>
      <UserImg src={`${fileHost}/${imgPath}`} />
      <Header>{user.name}</Header>
      <Username>@{user.username}</Username>
      <NumSubscribed>{numSubscribed} subscribed</NumSubscribed>
      {bio && <p>{bio}</p>}
      {link && (
        <A href={link}>
          <LinkIcon icon={linkIcon} />
          {trimProtocol(link)}
        </A>
      )}
    </Wrapper>
  );
};

Profile.propTypes = {
  imgPath: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  numSubscribed: PropTypes.number.isRequired,
  bio: PropTypes.string.isRequired,
  editable: PropTypes.bool
};

export default Profile;
