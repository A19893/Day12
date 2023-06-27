import React from 'react';
const Message = (props) => {
  return (
    <div className="message ">
    <div className="messageinfo">
        <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R106874875&ga=GA1.2.2042889475.1686818793&semt=ais" alt="missing" className='Avatar'/>
        <span>just now</span>
    </div>
    <div className="messagecontent">
        <p>{props.msg}</p>
        <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R106874875&ga=GA1.2.2042889475.1686818793&semt=ais" alt=""/>
    </div>
    </div>
  );
}

export default Message;
