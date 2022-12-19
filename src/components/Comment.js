import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import dateTimeParser from "../tools/dateTimeParser";

import {
  __deleteComment,
  __updateComment,
} from "../redux/modules/CommentsSlice";
import { useDispatch, useSelector } from "react-redux";

function Comment({
  comment: { commentId, userId, nickname, comment, updatedAt },
}) {
  const loginUserId = useSelector((store) => store.user.id);
  const dispatch = useDispatch();
  const ref = useRef();
  const [isModify, setIsModify] = useState(false);
  const handleModify = () => {
    setIsModify(!isModify);
  };
  useEffect(() => {
    if (!ref?.current) return;
    if (isModify) ref.current.focus();
  }, [isModify]);

  const [content, setContent] = useState(comment);
  const handleOnChange = ({ target: { value } }) => {
    setContent(value);
  };

  const handleUpdate = () => {
    if (content.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    dispatch(__updateComment({ commentId, comment: content }));
    setContent("");
    handleModify();
  };

  const handleDelete = () => {
    alert("댓글을 삭제하시겠습니까?");
    dispatch(__deleteComment({ commentId }));
  };
  return (
    <Wrapper>
      <LeftContent>
        <NicknameBox>{nickname}</NicknameBox>
        {isModify ? (
          <InputBox
            ref={ref}
            type="text"
            value={content}
            placeholder="댓글을 입력해주세요"
            onChange={handleOnChange}
          />
        ) : (
          <CommentBox>{comment}</CommentBox>
        )}
        <Timestamp>{dateTimeParser(updatedAt)}</Timestamp>
      </LeftContent>
      {loginUserId === userId ? (
        <RightContent>
          {isModify ? (
            <BtnWrapper>
              <Button size="small" text="수정완료" handler={handleUpdate} />
              <Button
                size="small"
                type="cancel"
                text="수정취소"
                handler={handleModify}
              />
            </BtnWrapper>
          ) : (
            <BtnWrapper>
              <Button size="small" text="수정" handler={handleModify} />
              <Button
                size="small"
                type="accent"
                text="삭제"
                handler={handleDelete}
              />
            </BtnWrapper>
          )}
        </RightContent>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const NicknameBox = styled.span`
  font-weight: 800;
`;

const LeftContent = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const CommentBox = styled.div`
  width: 70%;
  height: 20px;
`;

const InputBox = styled.input`
  width: 70%;
  height: 20px;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
`;

const Timestamp = styled.span`
  font-size: 12px;
  font-style: italic;
  color: white;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default Comment;
