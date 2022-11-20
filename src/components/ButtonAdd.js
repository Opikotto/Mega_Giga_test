import React,{useState} from 'react'
import { useForm } from "react-hook-form";


const ButtonAdd = (props) => {
     const [author, setAuthor] = useState("")
     const [description, setDescription] = useState("")
     const [isbn, setIsbn] = useState("")
     const [publisher, setPublish] = useState("")
     const [title, setTitle] = useState("")
     const {
          register,
          handleSubmit,
          formState: { errors }
        } = useForm();
        
        const submit = async (ev) => {
          await fetch("http://159.223.57.121:8080/books",{
               method: "POST",
               body: JSON.stringify({
                    author: author,
                    description: description,
                    isbn: isbn,
                    publisher:publisher,
                    title: title
               }), 
               headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization':JSON.parse(localStorage.getItem('data')).token, 
               }, 
          })
          .then((response) => {
               console.log(response.body)
               if (response.status !== 201) {
                    console.log(response)
                    window.location.reload()
                    return;
               } else {
                    return response.json();
               }
          })
          props.addBuku()
     }
  return (
     <section>
               <div className="hero-body">
                    <div className="container">
                         
                         <div className="">
                                  
                              <div className="column is-8-desktop">
                                   <form onSubmit={handleSubmit(submit)} className="box">
                                        <p className="has-text-centered"></p>
                                        <div className="field mt-5">
                                             <label className="label">Author</label>
                                             <div className="controls">
                                                  <input type="text"
                                                  className="input"
                                                  placeholder="Author"
                                                  {...register("authorRequired", { required: true })}
                                                  value={author} 
                                                  onChange={(e) => {
                                                       setAuthor(e.target.value)
                                                  }}
                                                  />
                                                   {errors.authorRequired && <p>This field is required Author</p>}
                                             </div>
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Description</label>
                                             <div className="controls">
                                                  <input type="text" 
                                                  className="input" 
                                                  placeholder='Description'
                                                  {...register("descriptionRequired", { required: true })}
                                                  value={description}
                                                   onChange={(e) => {
                                                       setDescription(e.target.value)
                                                   }}
                                                    />
                                                    {errors.descriptionRequired && <p>This field is required Description</p>}
                                             </div>
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Isbn</label>
                                             <div className="controls">
                                                  <input type="number" 
                                                  className="input"
                                                  placeholder="Isbn"
                                                  min={1}
                                                  {...register("isbnRequired", { required: true })}
                                                  value={isbn}
                                                  onChange={(e) => {
                                                       setIsbn(e.target.value)
                                                  }} 
                                                  />
                                                   {errors.isbnRequired && <p>This field is required Isbn</p>}
                                             </div>
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Publisher</label>
                                             <div className="controls">
                                                  <input type="text"
                                                   className="input"
                                                   placeholder="Publisher" 
                                                   value={publisher}
                                                   {...register("publisherRequired", { required: true })}
                                                   onChange={(e) => {
                                                       setPublish(e.target.value)
                                                   }}
                                                  
                                                   />
                                                     {errors.publisherRequired && <p>This field is required Publisher</p>}
                                             </div>
                                        </div>
                                        <div className="field mt-5">
                                             <label className="label">Title</label>
                                             <div className="controls">
                                                  <input type="text"
                                                   className="input"
                                                   placeholder="Title" 
                                                   {...register("titleRequired", { required: true })}
                                                   value={title}
                                                   onChange={(e) => {
                                                       setTitle(e.target.value)
                                                   }}
                                                   />
                                                     {errors.titleRequired && <p>This field is required Title</p>}
                                             </div>
                                        </div>
                                        <div className="field mt-5 is-4-desktop button__inline ">
                                             <button className="button is-success  is-inline-block ">Submit</button>
                                            
                                        </div>
                                   </form>        
                              </div>
                         </div>
                    </div>
               </div>
          </section>
  )
}

export default ButtonAdd
