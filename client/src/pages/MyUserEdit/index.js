import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { logout } from "../../actions/auth";
import { setAlert } from "../../actions/page";
import { createPost } from "../../actions/post";
import {
  setMyProfile,
  updateUser,
  deleteUser,
  updateBio,
  updateLink
} from "../../actions/profile";
import {
  Button,
  Input,
  TextArea,
  NumChars,
  CheckBox
} from "../../views/styled";
import {
  SubHeader,
  Divider,
  ContentWrapper,
  DeleteButton,
  Wrapper
} from "./styled";
import { SubscribeBox } from "../SignUp/styled";
import ImgUpload from "./ImgUpload";
import { nextPublishDate, trimValues } from "../../utils";
import {
  checkUserEdit,
  checkLink,
  checkBio,
  maxBioLength
} from "../../utils/validation";

const MyUser = ({
  setAlert,
  myProfile,
  setMyProfile,
  updateBio,
  updateLink,
  updateUser,
  deleteUser
}) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mailSub: false,
    password: "",
    password2: ""
  });
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [countSec, setCountSec] = useState(
    nextPublishDate().diff(moment().utc(), "seconds")
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countSec > 0) {
        setCountSec(nextPublishDate().diff(moment().utc(), "seconds"));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countSec, setCountSec]);

  useEffect(() => {
    if (!myProfile) {
      setMyProfile();
    }
  }, [myProfile, setMyProfile]);

  useEffect(() => {
    if (myProfile) {
      setUserData({
        name: myProfile.user.name,
        email: myProfile.user.email,
        mailSub: myProfile.user.mailSub,
        password: "",
        password2: ""
      });
      setBio(myProfile.bio);
      setLink(myProfile.link);
    }
  }, [myProfile, setUserData]);

  const onUpdateUserForm = event =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const onToggleMailSub = () => {
    setUserData({ ...userData, mailSub: !userData.mailSub });
  };

  const onUpdateBio = event => {
    const newBio = event.target.value;
    const invalidMsg = checkBio(newBio);
    if (!invalidMsg) {
      setBio(event.target.value);
    }
  };

  const onUserDataSubmit = () => {
    trimValues(userData);
    const { name, email, password, password2 } = userData;
    const invalidMsg = checkUserEdit(name, email, password, password2);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      updateUser(userData, () =>
        history.push(`/user/${myProfile.user.username}`)
      );
    }
  };

  const onDelete = () => {
    !confirmDelete ? setConfirmDelete(true) : deleteUser(history);
  };

  const onProfileSubmit = () => {
    const trimmedLink = link.trim();
    const invalidMsg = trimmedLink && checkLink(trimmedLink);

    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      if (trimmedLink) {
        updateLink(trimmedLink, () =>
          history.push(`/user/${myProfile.user.username}`)
        );
      }
      updateBio(bio.trim(), () =>
        history.push(`/user/${myProfile.user.username}`)
      );
    }
  };

  return !myProfile ? null : (
    <Wrapper>
      <SubHeader>Update User</SubHeader>
      <ContentWrapper>
        <Input
          name="name"
          value={userData.name}
          type="text"
          placeholder="Name"
          onChange={onUpdateUserForm}
        />
        <Input
          name="email"
          value={userData.email}
          type="email"
          placeholder="Email (optional)"
          onChange={onUpdateUserForm}
        />
        <Input
          name="password"
          value={userData.password}
          type="password"
          placeholder="Password (optional)"
          onChange={onUpdateUserForm}
        />
        <Input
          name="password2"
          value={userData.password2}
          type="password"
          placeholder="Confirm password (optional)"
          onChange={onUpdateUserForm}
        />
        <SubscribeBox>
          Send me a weekly email{" "}
          <CheckBox
            name="mailSub"
            type="checkbox"
            checked={userData.mailSub}
            onChange={onToggleMailSub}
          />
        </SubscribeBox>
        <Button onClick={onUserDataSubmit}>Update</Button>
      </ContentWrapper>
      <Divider />
      <SubHeader>Update Profile</SubHeader>
      <ContentWrapper>
        <TextArea
          name="name"
          value={bio}
          type="textarea"
          placeholder="Add your bio"
          onChange={onUpdateBio}
        />
        <NumChars>
          {bio.length} / {maxBioLength}
        </NumChars>
      </ContentWrapper>
      <ContentWrapper>
        <Input
          name="link"
          value={link}
          type="text"
          placeholder="Link to your website"
          onChange={event => setLink(event.target.value)}
        />
        <Button onClick={onProfileSubmit}>Update</Button>
      </ContentWrapper>
      <Divider />
      <SubHeader>Upload Profile Image</SubHeader>
      <ContentWrapper>
        <ImgUpload />
      </ContentWrapper>
      <Divider />
      <SubHeader>Delete Account</SubHeader>
      <ContentWrapper>
        <DeleteButton onClick={onDelete}>
          {confirmDelete ? "Confirm delete account" : "Delete account"}
        </DeleteButton>
      </ContentWrapper>
    </Wrapper>
  );
};

MyUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setMyProfile: PropTypes.func.isRequired,
  updateBio: PropTypes.func.isRequired,
  updateLink: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  myProfile: PropTypes.object
};

const mapStateToProps = state => ({
  myProfile: state.profile.myProfile
});

export default connect(mapStateToProps, {
  logout,
  setAlert,
  createPost,
  setMyProfile,
  updateUser,
  deleteUser,
  updateBio,
  updateLink
})(MyUser);
