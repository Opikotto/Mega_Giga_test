import React from 'react'

const Table = props => {
    
  return (
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
      {props.dataBuku.data.length > 0 ? (
        props.dataBuku.data.map((item,i) => (
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
                onClick={() => props.editRow(item)}
              >
                Edit
              </button>
              <button
                className="button muted-button"
                onClick={() => props.deletebuku(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      )}
    </tbody>
</table>           
  )
}

export default Table
