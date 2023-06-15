// default react typecript field instance
import React from 'react';

export type BaseFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

const BaseField: React.FC<BaseFieldProps> = () => {
  return (
    <div>
      
    </div>
  );
};

export default BaseField;