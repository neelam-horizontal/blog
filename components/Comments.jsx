import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { getComments, getReplies, submitReplies } from "../services";

const Comments = ({ slug }) => {
  const [counter, setCounter] = useState(0);
  const [comments, setComments] = useState([]);
  const [openReply, setOpenReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [reply, setReply] = useState([]);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, [slug]);

  const handleLikes = () => {
    setCounter(counter + 1);
  };

  const handleReply = () => {
    setOpenReply(!openReply);
  };

    const submitReply = (e) => {
      setReply(e.target.value)
    }

  // const submitReply = async (commentId) => {
  //   try {
  //     const newReply = await submitReplies(commentId, {
  //       reply: replyText,
  //     });

  //     // Update replies for the specific comment
  //     setReplies((prevReplies) => ({
  //       ...prevReplies,
  //       [commentId]: [...(prevReplies[commentId] || []), newReply],
  //     }));

  //     setReplyText("");
  //   } catch (error) {
  //     console.error("Error submitting reply:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (comments.length > 0) {
  //     // Fetch replies for each comment
  //     Promise.all(comments.map((comment) => getReplies(comment.id)))
  //       .then((repliesArray) => {
  //         const repliesMap = {};
  //         repliesArray.forEach((replyList, index) => {
  //           repliesMap[comments[index].id] = replyList;
  //         });
  //         setReplies(repliesMap);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching replies:", error);
  //       });
  //   }
  // }, [comments]);

  return (
    <>
      {comments?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.comment)}
              </p>
              <p
                className="flex whitespace-pre-line text-gray-600 w-full"
                onClick={handleLikes}
              >
                <span className="flex items-center gap-2 mr-2 cursor-pointer">
                  {counter}
                  {counter > 0 ? <FaHeart /> : <FiHeart />}
                </span>
                Like
              </p>

              <p onClick={handleReply} className="cursor-pointer">
                Reply
              </p>
              {openReply === true
                ? <>
                <input
                  type="text"
                  placeholder="Enter your Reply"
                  onChange={submitReply}
                  />
                  <button onClick={setOpenReply}>Save</button>
                  </>
                : <span>{reply}</span>
                }
              {/* {openReply === true && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your Reply"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      submitReply(comment.id);
                      setOpenReply(false);
                    }}
                  >
                    Save
                  </button>
                </>
              )}

              {replies[comment.id]?.map((reply, replyIndex) => (
                <div key={replyIndex} className="pl-4 mt-2">
                  <p>
                    <span className="font-semibold">{reply.name}</span> on{" "}
                    {moment(reply.createdAt).format("MMM DD, YYYY")}
                  </p>
                  <p className="text-gray-600">{reply.reply}</p>
                </div>
              ))} */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
