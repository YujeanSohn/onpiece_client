import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "../components/Button";
import Comment from "../components/Comment";

import { __addComment, __getComments } from "../redux/modules/CommentsSlice";

function CommentList({ postId }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.comments.isLoading);
  const comments = useSelector((store) => store.comments.comments);
  useEffect(() => {
    dispatch(__getComments({ postId }));
  }, []);

  const [comment, setComment] = useState("");
  const handleChangeComment = ({ target: { value } }) => {
    setComment(value);
  };
  const handleCommentSubmit = () => {
    if (comment.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    dispatch(__addComment({ postId, comment }));
    setComment("");
  };

  return (
    <CommentsWrapper>
      <InputWrapper>
        <Input type="text" value={comment} onChange={handleChangeComment} />
        <Button text="게시" handler={handleCommentSubmit} />
      </InputWrapper>
      {isLoading ? (
        <InfoBox>데이터를 불러오는 중입니다.</InfoBox>
      ) : (
        comments.map((v) => <Comment key={v.commentId} comment={v} />)
      )}
    </CommentsWrapper>
  );
}

const CommentsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const InputWrapper = styled.div`
  padding: 5px 10px 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  border: white;
  width: 90%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 300px;
  line-height: 300px;
  text-align: center;
  color: white;
  font-size: 12px;
`;

export default memo(CommentList);
