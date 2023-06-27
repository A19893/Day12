import React, { useEffect,useState } from 'react'
import {collection,getDocs,addDoc} from "firebase/firestore"
import { db } from '../config/Firebase'
import { useSelector,useDispatch } from 'react-redux'
import { showParticularUser,CurrentChatRoomId,savesenderid } from '../Features/UserSlice'
const Users = () => {
    const Username=useSelector((state) => state.userdetails.Username);
    useEffect(()=>{
        const fetchData=async()=>{
            const data =await getDocs(collection(db,"Users"))
            const users=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
            const FilteredData=users.filter((item)=>{
                return item.email===Username;
            })
            console.log(FilteredData)
            setSenderid(FilteredData[0].userid)
            dispatch(savesenderid(FilteredData[0].userid))
            setUsers(users)
        }
        fetchData();
    },[])
    const dispatch=useDispatch();
    const[users,setUsers]=useState(null)
    const[senderid,setSenderid]=useState(null);
    const createChats=async(chatRoomId,recieverid)=>{
     const docRef=await addDoc(collection(db,"Chats"),{
       chatRoomId:chatRoomId,
       senderid:senderid,
       reciverid:recieverid,
       messages:[]
     });
     console.log(docRef.id)
    }
    const clickHandler=async(data)=>{
        console.log("ugsxiugasiuxg",data);

        let chatRoomId=null;
        if(senderid<data.userid){
            console.log(senderid)
          chatRoomId=senderid?.toString()+data?.userid.toString()
          console.log(chatRoomId)
        }
        else{
          console.log(senderid)
          chatRoomId=senderid?.toString()+data?.userid.toString()
          console.log(chatRoomId)
        }
        dispatch(CurrentChatRoomId(chatRoomId))
        const chatRoom = await getDocs(collection(db, "Chats"));
        const users = chatRoom.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const currentUser=users.filter((item)=>{
         return chatRoomId===item.chatRoomId
        })
        console.log(currentUser)
        if(currentUser.length>0){
            dispatch(showParticularUser(data))
        }
        else{
        await createChats(chatRoomId,data.userid);
        dispatch(showParticularUser(data))
        }
    }
  return (
    <>
        {
            users?.map((item,idx)=>{
                if(item.email!==Username)
            return(
                <>
                <div className="user" key={idx}>
                 <div className="userimage">
                <img
                  src="https://img.freepik.com/free-photo/young-man-wearing-blue-outfit-looking-confident_1298-291.jpg?size=626&ext=jpg&uid=R106874875&ga=GA1.2.2042889475.1686818793&semt=ais"
                  alt="Avatar"
                  className="Avatar"
                />
              </div>
              <div className="userdetails">
                <span style={{ margin: "0px",fontSize:"18px",fontWeight:500,paddingTop:"0px" }} onClick={()=>clickHandler(item)}>{item.name}</span>
              </div>
              </div>
                </>
            )
            })
        }
    </>
  )
}

export default Users