import React from "react"
const Login=()=>{
    return(
        <div className="container">
            <p className="login">Log in</p>
            <form class="form-group">
                <div className="input-group">
                    <input type="text" required></input>
                    <label for="email">Email</label>
                </div>
                <div className="input-group">
                     <input type="password" required></input>
                    <label for="password">password</label>

                </div>
                <p className="password">Forgot Password?</p>
                <div>

                    <button type="submit">Login</button>
                </div>
                <p>Don't have an account?Sign up</p>
            </form>

        </div>
    )
}
export default Login