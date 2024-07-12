import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiReply } from "react-icons/hi";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { messageAction, userAction } from "../../redux/features/userSlice";
import { apiServices } from "../../services/api_services";

const MessagesCard = ({
  name,
  email,
  phoneNo,
  message,
  createdAt,
  messageId,
}) => {
  const initialName = name.charAt(0).toUpperCase();
  const publishDate = new Date(createdAt);
  const humanReadableDateOnly = publishDate.toLocaleDateString();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [reply, setReply] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const deleteMessageHandler = async () => {
    try {
      dispatch(messageAction.deleteMessageRequest());
      const { data } = await apiServices.deleteMessage(messageId);
      dispatch(messageAction.deleteMessageSuccess(data.message));
      setOpen(!open);
      dispatch(userAction.loadUserRequest());
      const { data: loaduser } = await apiServices.loadUser();
      dispatch(userAction.loadUserSuccess(loaduser.user));
    } catch (error) {
      dispatch(messageAction.deleteMessageFailure(error.response.data.message));
    }
  };

  const replyMessageHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        textMsg: reply,
      };
      dispatch(messageAction.replyMessageRequest());
      const { data } = await apiServices.replyMessage(messageId, payload);
      dispatch(messageAction.replyMessageSuccess(data.message));
      setOpen2(!open2);
      dispatch(userAction.loadUserRequest());
      const { data: loaduser } = await apiServices.loadUser();
      dispatch(userAction.loadUserSuccess(loaduser.user));
    } catch (error) {
      dispatch(messageAction.replyMessageFailure(error.response.data.message));
    }
  };

  return (
    <div className="w-full p-4 flex gap-3 items-center px-3 max-md:flex-col">
      <div className="bg-slate-900 h-40 w-40 rounded-full flex items-center self-start justify-center max-md:self-center overflow-hidden">
        <h1 className="font-semibold text-5xl text-white">{initialName}</h1>
      </div>
      <div className="flex-1 ">
        <h1 className="text-2xl font-semibold max-md:text-center">{name}</h1>
        <div className="my-2">
          <p className=" py-1 text-gray-600 text-justify w-fit rounded-full  font-medium text-base  mb-1 mr-1">
            {message}
          </p>
        </div>
        <div>
          <h1 className="text-base text-gray-500 font-semibold max-md:text-center">
            Sent at <span>{humanReadableDateOnly}</span>
          </h1>
        </div>
      </div>
      <div className="max-md:flex gap-3">
        <div
          className="flex items-center bg-red-600 h-10 w-10 justify-center  rounded-full mb-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <RiDeleteBin5Fill color="white" size={25} />
        </div>
        <div
          className="flex items-center bg-[#344C36] h-10 w-10 justify-center  rounded-full mb-2 cursor-pointer"
          onClick={() => setOpen2(!open2)}
        >
          <HiReply color="white" size={25} />
        </div>
      </div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => setOpen(!open)}
      >
        <div className="p-10 max-sm:h-screen max-sm:flex  max-sm:items-center max-sm:justify-center">
          <div>
            <h1 className="text-lg text-red-500 text-center mb-5 font-semibold">
              Are you want to Delete this Messages?
            </h1>
            <div className="flex ">
              <div
                className="flex-1 border py-3 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <h1 className="text-center">Cancel</h1>
              </div>
              <div
                className="flex-1 bg-red-500 py-3 cursor-pointer"
                onClick={deleteMessageHandler}
              >
                <h1 className="text-white text-center">Delete</h1>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open2}
        onClose={() => setOpen2(!open2)}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="h-[600px] flex flex-col p-5">
          <form onSubmit={replyMessageHandler}>
            <div className="mb-2">
              <h1 className="font-semibold text-lg">Name</h1>
              <input
                type="text"
                className="w-full border h-12 rounded-lg p-2 outline-none"
                value={name}
                readOnly
              />
            </div>
            <div className="mb-2">
              <h1 className="font-semibold text-lg">Email</h1>
              <input
                type="email"
                className="w-full border h-12 rounded-lg p-2 outline-none"
                value={email}
                readOnly
              />
            </div>
            <div className="mb-2">
              <h1 className="font-semibold text-lg">PhoneNo</h1>
              <input
                type="text"
                className="w-full border h-12 rounded-lg p-2 outline-none"
                value={phoneNo}
                readOnly
              />
            </div>
            <div className="mb-2">
              <h1 className="font-semibold text-lg">Message</h1>
              <textarea
                rows={5}
                cols={5}
                className="border w-full  rounded-lg p-2 outline-none"
                value={message}
                readOnly
                spellCheck={false}
              ></textarea>
            </div>
            <div className="mb-2">
              <h1 className="font-semibold text-lg">Reply</h1>
              <textarea
                rows={5}
                cols={5}
                className="border w-full rounded-lg p-2 outline-none"
                spellCheck={false}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={`Reply to : ${email}`}
                required
              ></textarea>
            </div>
            <div className="flex mb-1">
              <div
                className="flex-1 border py-3 cursor-pointer"
                onClick={() => setOpen2(!open2)}
              >
                <h1 className="text-center">Cancel</h1>
              </div>
              <button type="submit" disabled={!reply} className="flex-1">
                <div
                  className={`${
                    reply
                      ? "bg-[#344C36] cursor-pointer"
                      : "bg-[#5b805e] cursor-not-allowed"
                  }  py-3 `}
                >
                  <h1 className="text-white text-center">Send</h1>
                </div>
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default MessagesCard;
