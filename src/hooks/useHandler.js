import react, { useState } from "react";

const useHandler = () => {
  const [value, setValue] = useState("");

  const handler = (event) => {
    setValue(event.currentTarget.value);
  };

  return [value, handler];
};

export default useHandler;
