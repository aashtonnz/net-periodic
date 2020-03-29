import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { uploadImg } from "../../actions/profile";
import { setAlert } from "../../actions/page";
import { FileInput } from "./styled";
import { Button } from "../../views/styled";
import { checkImg } from "../../utils/validation";

const ImgUpload = ({ uploadImg, setAlert, myProfile }) => {
  const [img, setImg] = useState("");
  const [inputKey, setInputKey] = useState("");
  const history = useHistory();

  const onChange = event => {
    setImg(event.target.files[0]);
  };

  const onSubmit = () => {
    if (!img) {
      setAlert("No image provided", "danger");
      return;
    }
    const invalidMsg = checkImg(img);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      uploadImg(img, () => history.push(`/user/${myProfile.user.username}`));
      setInputKey(Date.now());
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <FileInput key={inputKey} type="file" onChange={onChange} />
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
};

ImgUpload.propTypes = {
  setAlert: PropTypes.func.isRequired,
  uploadImg: PropTypes.func.isRequired,
  myProfile: PropTypes.object
};

const mapStateToProps = state => ({
  myProfile: state.profile.myProfile
});

export default connect(mapStateToProps, { uploadImg, setAlert })(ImgUpload);
