import React, { ChangeEvent } from "react";
import InputForm from "../Molecules/InputForm";

interface OrganismsLoginProps {
  name: string;
  value: string;
  type:string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className:string;
  label: string;
};

const OrganismsInputForm = ({
  label,
  name,
  value,
  onChange,
  type,
  className,
}: OrganismsLoginProps) => {
  return (
    <div className="flex flex-col">
      <InputForm
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        maxLength={20}
        className={className} 
      />
    </div>
  );
};

export default OrganismsInputForm;
