import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Register() {
     const [username, SetUserName] = useState("")
     const [password, SetPassword] = useState("")
     const [profile, SetProfile] = useState("")
     const [address, setAddress] = useState("")
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors }
     } = useForm();

     const Regis = async (e) => {
          e.preventDefault();
          await fetch("http://159.223.57.121:8080/auth/do-register", {
               method: "POST",
               body: JSON.stringify({
                    address: address,
                    password: password,
                    profileName: profile,
                    username: username
               }),
               headers: {
                    "Content-type": "application/json; charset=UTF-8"
               }
          })
               .then((response) => {
                    console.log(response.status)
                    if (response.status !== 201) {
                         navigate('/')
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
                                   <form onSubmit={handleSubmit(Regis)} className="box controls">
                                        <p className="has-text-centered"></p>
                                        <div className="field mt-5">
                                             <label className="label">Name</label>
                                             <div className="controls">
                                                  <input type="text" 
                                                  className="input" 
                                                  placeholder="Name"
                                                  {...register("usernameRequired", {
                                                       required: true
                                                  })}

                                                  value={username} 
                                                  onChange={(e) => {
                                                            SetUserName(e.target.value)
                                                       }}
                                                  />
                                             </div>
                                             {errors.usernameRequired && <p>This field is required</p>}
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Profile Name</label>
                                             <div className="controls">
                                                  <input type="text"
                                                   className="input" 
                                                   placeholder="profile name" 
                                                   {...register("profileName",{
                                                       required:true
                                                   })}
                                                   value={profile} 
                                                   onChange={(e) => SetProfile(e.target.value)} />
                                             </div>
                                             {errors.profileName && <p>This field is required</p>}
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Password</label>
                                             <div className="controls">
                                                  <input 
                                                  type="password" 
                                                  className="input" 
                                                  placeholder="******" 
                                                  {...register("password",{
                                                       required:true
                                                  })} 
                                                  value={password}
                                                  onChange={(e) => SetPassword(e.target.value)} />
                                             </div>
                                             {errors.password && <p>This field is required</p>}
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Address</label>
                                             <div className="controls">
                                                  <input 
                                                  type="text" 
                                                  className="input" 
                                                  placeholder="Address"
                                                  {...register("address",{
                                                       required:true
                                                  })}
                                                  value={address} 
                                                  onChange={(e) => setAddress(e.target.value)} />
                                             </div>
                                             {errors.address && <p>This field is required</p>}
                                        </div>
                                        <div className="field mt-5">
                                             <button className="button is-success is-fullwidth">Register</button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     )
}

export default Register
