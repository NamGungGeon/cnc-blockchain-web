import { useState } from "react";

const useInput = (initValue = {}) => {
  const [input, setInput] = useState(initValue);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return [input, handleChange, setInput];
};
export default useInput;
