import { useState, useEffect } from "react";

const useInput = (initValue, type) => {
  const [value, setValue] = useState(initValue);
  const [isValidated, setIsValidated] = useState(false);

  const limit = (type) => {
    switch (type) {
      case "title":
        setValue((prev) => prev.slice(0, 15));
        alert("제목은 15자 이하로 작성해주세요");
        return;
      case "limit":
        setValue(2);
        alert("인원 수는 30명 이하로 입력해주세요");
        return;
      case "content":
        setValue((prev) => prev.slice(0, 200));
        alert("내용은 200자 이하로 작성해주세요");
        return;
      default:
        break;
    }
  };

  (() => {
    if (type === "title" && value.length > 15) {
      limit(type);
    } else if (type === "content" && value.length > 200) {
      limit(type);
    } else if (type === "limit" && value > 30) {
      limit(type);
    }
  })();

  const [msg, setMsg] = useState("");

  const validate = (type) => {
    switch (type) {
      case "title":
        value.length < 2
          ? setMsg("제목은 2자 이상으로 작성해주세요")
          : setMsg("");
        return;
      case "limit":
        value < 2 ? setMsg("인원 수는 2명 이상으로 입력해주세요") : setMsg("");
        return;
      case "content":
        value.length < 20
          ? setMsg("내용은 20자 이상으로 작성해주세요")
          : setMsg("");
        return;
      default:
        break;
    }
  };

  const onChange = (e) => {
    if (!isValidated) setIsValidated(true);
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!isValidated) return;
    validate(type);
  }, [value]);

  const reset = () => {
    setValue(initValue);
    setIsValidated(false);
  };

  return [value, onChange, reset, msg];
};

export default useInput;
