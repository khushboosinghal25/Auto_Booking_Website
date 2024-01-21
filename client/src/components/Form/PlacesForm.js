import React from 'react'

const PlacesForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
<form onSubmit={handleSubmit}>
       
       <div className="mb-3">
         <input
           type="text"
           className="form-control"
           placeholder="Enter new Place"
           value={value}
           onChange={(e) => setValue(e.target.value)}
         />
       </div>

       <button type="submit" classname="btn btn-primary">
         Submit
       </button>
  
   </form>
    </>
  )
}

export default PlacesForm