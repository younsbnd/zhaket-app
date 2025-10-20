import React, { useRef, useEffect } from "react";
import ChatMessage from "../ChatMessage";

const MessagesList = ({ replies, currentUserId }) => {
  const endRef = useRef(null);

  //   useEffect to scroll to the bottom of the messages list
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [replies]);

  // messages list for ticket detail page
  return (
    <div className="space-y-2">
      {replies.map((reply) => (
        <ChatMessage
          key={reply._id}
          reply={reply}
          isCurrentUser={
            currentUserId === reply.user._id ||
            currentUserId === reply.user?._id?.toString()
          }
        />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessagesList;
