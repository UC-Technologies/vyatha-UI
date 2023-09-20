import "./module.scss";

const StudentLogin = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <div className="form">
        <form action="">
          <input type="text" className="nameinput" placeholder="  " id="name" />
          <label htmlFor="name">Name</label>
        </form>
      </div>

      <div className="form">
        <form action="">
          <input type="email" className="nameinput" placeholder="  " id="email" />
          <label htmlFor="email">Email</label>
        </form>
      </div>

      <div className="form">
        <form action="">
          <input type="number" className="nameinput" placeholder="  " id="scholar" />
          <label htmlFor="scholar">Scholar ID</label>
        </form>
      </div>

      <div className="form">
        <form action="">
          <input type="number" className="nameinput" placeholder="  " id="number" />
          <label htmlFor="number">Phone</label>
        </form>
      </div>

      <div className="form">
        <form action="">
          <input type="password" className="nameinput" placeholder="  " id="pass" />
          <label htmlFor="pass">Password</label>
        </form>
      </div>

      <div className="form">
        <form action="">
          <input type="password" className="nameinput" placeholder="  " id="confpass" />
          <label htmlFor="confpass">Confirm Password</label>
        </form>
      </div>

      <div className="button">
        <button>Submit</button>
      </div>
    </>
  );
};

export default StudentLogin;
