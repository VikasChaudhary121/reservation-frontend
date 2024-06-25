import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save Time, save Money</h1>
      <sapn className="mailDesc">SignUp and we'll send you the Details...</sapn>
      <div className="mailInputConatiner">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
