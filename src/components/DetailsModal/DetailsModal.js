import { CommentForm } from "../CommentForm/CommentForm";
import { useState, useEffect } from "react";
import "./DetailsModal.css";
import { UsersComments } from "../UsersComments/UsersComments";
import { LikeButton } from "../LikeButton/LikeButton";
import { useParams } from "react-router-dom";

export const DetailsModal = ({ photo, id, setModal, modal }) => {
  const [comments, setComments] = useState([]);
  console.log(comments);
  const [comment, setComment] = useState([]);
  console.log(comments);
  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/photoComments/${id}}`
      );
      const body = await res.json();
      if (res.ok) {
        setComments(body?.data);
      } else {
        throw new Error(body.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      <div className="details_modal">
        <div className="leftModal">
          <div className="details_modal_photo">
            <img src={`${process.env.REACT_APP_API_URL}/${photo}`} />
          </div>
        </div>
        <div className="rightModal">
          <div className="modalComments">
            <UsersComments comments={comments} />
          </div>
          <div className="modalCommentForm">
            <CommentForm
              setComment={setComment}
              comment={comment}
              comments={comments}
              setComments={setComments}
              id={id}
            />
          </div>
        </div>
        <span onClick={() => setModal(!modal)}>&times;</span>
      </div>
    </>
  );
};
