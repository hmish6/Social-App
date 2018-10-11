import React from "react";

import UserImage from "./UserImage";

const Info = props => {
  return (
    <div className="mb-5">
      <div>
        <UserImage userImage={props.user.image} />
        <span className="align-middle">{props.user.name}</span>
      </div>
      <p className="text-black-50">{props.user.email}</p>
    </div>
  );
};

export default Info;
