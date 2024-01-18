import React from "react";

// Alert 컴포넌트는 경고 메시지를 표시하는 역할을 합니다.
// type prop은 알림의 스타일을 지정하며, text prop은 표시될 메시지를 나타냅니다.
const Alert = ({ type, text }) => {
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alert;
