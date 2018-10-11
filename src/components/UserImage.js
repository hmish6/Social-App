import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../css/UserImage.css";

const UserImage = props => {
  let image = props.userImage ? props.userImage : "../images/user-image.jpg";
  return (
    <div className="rounded-circle d-inline-block mr-3">
      <img src={image} className="user-image" alt="user" />
    </div>
  );
};

export default UserImage;
