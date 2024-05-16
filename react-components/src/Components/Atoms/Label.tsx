import React from "react";

interface InputLabelProps {
  label: string;
  className:string;
  onClick?:() => void;
};

const Label = ({ label,className,onClick }: InputLabelProps) => {
  return <label className={className} onClick={onClick}>{label} </label>;
};

export default Label;
