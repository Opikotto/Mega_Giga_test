import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import ButtonEdit from './ButtonEdit';
import ButtonAdd from './ButtonAdd';
import Table from './Table';
import 'react-simple-hook-modal/dist/styles.css';


function Dashboard() {
     const [dataBuku, setDataBuku] = useState({ data: [] })
     const [editing, setEditing] = useState(false);
     const [isActive, setIsActive] = useState(false);
     const [dataSearch, setDataSearch] = useState(false)

     const handleClick = () => {
          setIsActive(current => !current);
          setCurrentBuku(initialFormState)
     };
     const initialFormState = {
          author: "",
          description: "",
          isbn: "",
          publisher: "",
          title: "",
          id: null
     };
     const [currentBuku, setCurrentBuku] = useState(initialFormState);

     const addBuku = () => {
          fetchData();
     };
     const editRow = (data) => {
          setCurrentBuku(data)
          setEditing(true);
          setIsActive(current => !current);
          fetchData();
     };
     const handleonChange = async (e) => {
          setNewSearch(parseFloat(e.target.value))
          if (e.target.value.length > 0) {
               setDataSearch(true)
               await fetch(`http://159.223.57.121:8080/books/findbyid/${e.target.value}`, {
                    method: "GET",
                    headers: {
                         "Content-type": "application/json; charset=UTF-8",
                         'Authorization': JSON.parse(localStorage.getItem('data')).token,
                    }
               }).then((response) => {
                    if (response.status !== 201) {
                         return;
                    } else {
                         return response.json();
                    }
               })
          } else {
               setDataSearch(false)
          }
     }
     const [search, setNewSearch] = useState("");

     const filtered = !search
          ? dataBuku.data
          : dataBuku.data.filter((data) =>
               data.id.toString().toLowerCase().includes(search.toString().toLowerCase()
         ));
         
     const deletebuku = async id => {
          await fetch(`http://159.223.57.121:8080/books/${id}`, {
               method: "DELETE",
               headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': JSON.parse(localStorage.getItem('data')).token,
               }
          }).then(response => response.json())
          fetchData();
     }
     const fetchData = async () => {
          const data = await fetch("http://159.223.57.121:8080/books?limit=20&offset=0&param=", {
               method: "GET",
               headers: {
                    'Authorization': JSON.parse(localStorage.getItem('data')).token,
                    "Content-type": "application/json; charset=UTF-8"
               }
          }).then(response => response.json())
          setDataBuku(data)
     };

     useEffect(() => {
          fetchData();
     }, [])

     return (
          <>
               <Navbar />
               <div className="container mt-5">
                    <button className="button" onClick={handleClick}>
                         {isActive ? 'Close' : 'Add Book'}
                    </button>
               </div>

               <div className="container ">
                    <input type="number" className='input mt-5 mb-5' onChange={handleonChange} />
                    {editing ? (
                         <div className={isActive ? 'bg_custom show' : 'bg_custom hidden'}>
                              <div className={isActive ? 'popup-custom show' : 'popup-custom hidden'}>
                                   <ButtonEdit
                                        currentBuku={currentBuku}
                                   />
                              </div>
                         </div>

                    ) : (

                         <div className={isActive ? 'bg_custom show' : 'bg_custom hidden'}>
                              <div className={isActive ? 'popup-custom show' : 'popup-custom hidden'}>
                                   <ButtonAdd addBuku={addBuku} />
                              </div>
                         </div>
                    )}
                    {dataSearch ? (
                         <div>
                              <table className=" table is-striped is-fullwidth" >
                                   <thead>
                                        <tr>
                                             <th>No</th>
                                             <th>Id</th>
                                             <th>Name</th>
                                             <th>ISBN</th>
                                             <th>Penerbit</th>
                                             <th>Description</th>
                                             <th>Aksi</th>
                                        </tr>
                                   </thead>
                                   <tbody>

                                        {filtered.map((item, i) => {
                                             return (
                                                  <tr key={item.id}>
                                                       <td>{i + 1}</td>
                                                       <td>{item.id}</td>
                                                       <td>{item.title}</td>
                                                       <td>{item.isbn}</td>
                                                       <td>{item.publisher}</td>
                                                       <td>{item.description}</td>
                                                       <td>
                                                            <button
                                                                 className="button muted-button mr-4"
                                                                 onClick={() => editRow(item)}
                                                            >
                                                                 Edit
                                                            </button>
                                                            <button
                                                                 className="button muted-button"
                                                                 onClick={() => deletebuku(item.id)}
                                                            >
                                                                 Delete
                                                            </button>
                                                       </td>
                                                  </tr>
                                             );
                                        })}

                                   </tbody>
                              </table>
                         </div>
                    ) :
                         (
                              <div className="flex-large">
                                   <Table dataBuku={dataBuku} deletebuku={deletebuku} editRow={editRow} />
                              </div>
                         )}

               </div>

          </>

     )
}

export default Dashboard