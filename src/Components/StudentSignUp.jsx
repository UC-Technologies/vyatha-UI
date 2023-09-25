import "./StudentSignUp.module.scss";

const StudentSignUp = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <form action="">
        <div className="form">
          <input type="text" placeholder=" " className="nameinput" id="name" />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form">
          <input type="email" placeholder=" " className="nameinput" id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form">
          <input type="number" placeholder=" " className="nameinput" id="scholar" />
          <label htmlFor="scholar">Scholar ID</label>
        </div>
        <div className="form">
          <input type="number" placeholder=" " className="nameinput" id="phone" />
          <label htmlFor="phone">Phone</label>
        </div>
        <div className="form">
          <input type="password" placeholder=" " className="nameinput" id="pass" />
          <label htmlFor="pass">Password</label>
        </div>
        <div className="form">
          <input type="password" placeholder=" " className="nameinput" id="passconf" />
          <label htmlFor="passconf">Confirm Password</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default StudentSignUp;
