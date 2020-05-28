import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue(ref) {
        
      }
    })
  }, [fieldName, registerField]);

  return (
    <>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span>{error}</span>}
    </>
  );
}

export default Input;