import { useState } from "react";

const useInput = (initValue, type) => {
  const [value, setValue] = useState(initValue);

  const limit = (type) => {
    switch (type) {
      case "title":
        setValue((prev) => prev.slice(0, 15));
        alert("제목은 15자 이하로 작성해주세요");
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
    } else if (type === "content" && value.length > 20) {
      limit(type);
    }
  })();

  const [msg, setMsg] = useState("");

  const min = (type) => {
    switch (type) {
      case "title":
        setMsg("제목은 2자 이상으로 작성해주세요");
        return;
      case "content":
        setMsg("내용은 20자 이상으로 작성해주세요");
        return;
      default:
        break;
    }
  };

  (() => {
    if (type === "title" && value.length < 2) {
      min(type);
    } else if (type === "content" && value.length < 20) {
      min(type);
    }
  })();

  const onChange = (e) => setValue(e.target.value);

  const reset = () => setValue(initValue);

  return [value, onChange, reset, msg];
};

export default useInput;
