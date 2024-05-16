import React from "react";

interface ErrorMessageProps {
  message: string;
};

const ErrorMessage = ({ message }:ErrorMessageProps) => {
  return <p className="errorMsg">{message}</p>;
};

export default ErrorMessage;