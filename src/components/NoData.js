import React from 'react';

const NoData = (props) => {
  return <div className="alert alert-info">{props.children}</div>
}

export default NoData;