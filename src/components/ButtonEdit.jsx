import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";

const ButtonEdit = data => {  
    const [author,setAuthor] = useState(data.currentBuku.author)
    const [description,setDescription] = useState(data.currentBuku.description)
    const [isbn, setIsbn] = useState(data.currentBuku.isbn)
    const [publisher,setPublisher] = useState(data.currentBuku.publisher)
    const [title, setTitle] = useState(data.currentBuku.title)

    const {
     register,
     handleSubmit,
     formState: { errors }
   } = useForm();
   

     const submitEdit = async(ev) => {
          await fetch(`http://159.223.57.121:8080/books?id=${data.currentBuku.id}`,{
               method: "PUT",
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
                    window.location.reload()
                    return;
                   
               } else {
                    return response.json();
               }
               
          })          
     }
     useEffect(() => {
          setAuthor(data.currentBuku.author);
          setDescription(data.currentBuku.description)
          setIsbn(data.currentBuku.isbn)
          setPublisher(data.currentBuku.publisher)
          setTitle(data.currentBuku.title)
          
     }, [
          data.currentBuku.author,
          data.currentBuku.description,
          data.currentBuku.isbn,
          data.currentBuku.publisher,
          data.currentBuku.title
     ])

     return (
     <section>
     <div className="hero-body p-0">
          <div className="container">
               <div className="">       
                    <div className="column is-8-desktop">
                         <form onSubmit={handleSubmit(submitEdit)} className="box">
                              <p className="has-text-centered"></p>
                              <div className="field mt-5">
                                   <label className="label">Author</label>
                                   <div className="controls">
                                        <input type="text"
                                        className="input"
                                        placeholder="Author"
                                        name="author"
                                        value={author} 
                                        {...register("authorRequired", { required: true })}
                                        onChange={(e)=>{
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
                                        name="description"
                                        value={description}
                                        {...register("descriptionRequired", { required: true })}
                                        onChange={(e)=>{
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
                                        name="isbn"
                                        value={isbn}
                                        {...register("isbnRequired", { required: true })}
                                        onChange={(e)=>{
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
                                         name="publisher" 
                                         value={publisher}
                                         {...register("publisherRequired", { required: true })}
                                         onChange={(e)=>{
                                             setPublisher(e.target.value)
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
                                             name="title"
                                             value={title} 
                                             {...register("titleRequired", { required: true })}
                                             onChange={(e)=>{
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

export default ButtonEdit
