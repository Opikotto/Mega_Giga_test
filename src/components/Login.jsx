import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [success, setSuccess] = useState(false);
     const [failedLogin,setFailedLogin] = useState(false);
     const {
          register,
          handleSubmit,
          formState: { errors }
     } = useForm();
     const navigate = useNavigate();
     const Auth = async (e) => {
         // e.preventDefault();
          await fetch("http://159.223.57.121:8080/auth/do-login", {
               method: "POST",
               body: JSON.stringify({
                    username: username,
                    password: password
               }),
               headers: {
                    "Content-type": "application/json; charset=UTF-8"
               }
          })
               .then(async (response) => {
                    const data = await response.json()
                    console.log('data :', data)
                    window.localStorage.setItem("data", JSON.stringify(data.data));
                   
                    if(data.message === "LOGIN SUCCESS") {
                         setSuccess(true)
                         setTimeout(() => {
                              navigate('/dashboard')
                         }, 2000)
                    }
                    if (response.status !== 200) {
                         setFailedLogin(true)
                         return;
                    } else {
                         return response.json();
                    }
               })
     }

     return (
          <section className="hero has-background-grey-light is-fullheight is-fullwidth">
               <div className="hero-body">
                    <div className="container">
                         <div className="columns is-centered">
                              <div className="column is-4-desktop">
                                   <form onSubmit={handleSubmit(Auth)} className="box">
                                        <p className="has-text-centered"></p>
                                        <div className="field mt-5">
                                             <label className="label">Username</label>
                                             <div className="controls">
                                                  <input
                                                       type="text"
                                                       className="input"
                                                       placeholder="Username"
                                                       {...register("usernameRequired", {
                                                            required: true
                                                       })}
                                                       value={username}
                                                       onChange={(e) =>setUsername(e.target.value)}
                                                  />
                                                 {errors.usernameRequired && <p>This field is required</p>}
                                             </div>
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Password</label>
                                             <div className="controls">
                                                  <input type="password"
                                                       className="input"
                                                       placeholder="******"
                                                       {...register("passwordRequired", {
                                                            required: true
                                                       })}
                                                       value={password}
                                                       onChange={(e) => setPassword(e.target.value)}
                                                  />
                                                      {errors.passwordRequired && <p>This field is required</p>}
                                                 
                                             </div>
                                        </div>
                                        <div className="field mt-5">
                                             <button className="button is-success is-fullwidth">Login</button>
                                        </div>

                                        <Link to="/register" className="regis">Register</Link>
                                   </form>
                                   {success &&
                                        <div className="notification is-primary">
                                             Login Berhasil
                                        </div>
                                   }
                                 {failedLogin &&
                                        <div className="notification is-danger">
                                             Login Gagal 
                                        </div>
                                   }
                              </div>
                         </div>

                    </div>
               </div>
          </section>
     )
}

export default Login
