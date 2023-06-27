import React, { useEffect, useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Message from "./Message";
import Input from "./Input";
import OwnerMessage from "./OwnerMessage";
import { useSelector } from "react-redux";
import { getDocs, collection,doc,updateDoc,arrayUnion } from "firebase/firestore";
import { db } from "../config/Firebase";
const ParticularUser = () => {
  const chatRoomId = useSelector(
    (state) => state.userdetails.CurrentChatRoomId
  );
  const senderid = useSelector(
    (state) => state.userdetails.UserDetail.senderid
  );
  console.log(senderid)
  const[currentUser,setCurrentUser]=useState({});
  const[msg,setMsg]=useState("");
  const[updatedid,setupdateid]=useState("");
  const[currSenderId,setcurrSenderId]=useState("");
  console.log(chatRoomId)
  useEffect(() => {
    const fetchData = async () => {
      const chatRoom = await getDocs(collection(db, "Chats"));
        const users = chatRoom.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const curentUser=users.filter((item)=>{
            console.log(item.chatRoomId)
         return chatRoomId===item.chatRoomId
        })
        setupdateid(curentUser[0].id)
        console.log("mera user",curentUser)
        setCurrentUser(curentUser);
        setcurrSenderId(currentUser[0].senderid)
    };
    fetchData();
  },[chatRoomId]);
  const clickHandler=async()=>{
    console.log("clicked")
   const dRef = doc(db, "Chats", updatedid);
   await updateDoc(dRef,{messages: arrayUnion( msg)});
   setMsg("");
  }
  const particularUser = useSelector(
    (state) => state.userdetails.ParticularUser
  );
  return (
    <>
      <div className="chat-container">
        <div className="user-name">
          <h3
            style={{
              fontWeight: "lighter",
              margin: "0px",
              paddingTop: "25px",
              fontSize: "22px",
              paddingLeft: "10px",
              color: "lightgray",
            }}
          >
            {particularUser?.name}
          </h3>
          <div>
            <VideoCallIcon fontSize="large" className="videoicon" />
            <PersonAddAlt1Icon fontSize="large" className="videoicon" />
            <MoreHorizIcon fontSize="large" className="videoicon" />
          </div>
        </div>
            <div className="chatBox">
            {
            currentUser[0]?.messages?.map((item)=>{
            return(
                <>
                {console.log("asdasdas",senderid,currSenderId)}
                { currSenderId==senderid?
                 <OwnerMessage msg={item}/>:<Message msg={item}/>
                }
                </>
            )
            })
        }
        </div>
        <Input clickHandler={clickHandler} setMsg={setMsg}/>
      </div>
    </>
  );
};

export default ParticularUser;
