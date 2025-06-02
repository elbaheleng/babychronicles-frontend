import React from 'react'

function PageNotFound() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img className='h-96' src="https://www.dochipo.com/wp-content/uploads/2024/01/404-Error-Animation-4.gif" alt="image page not found"  />
        <h1 className='text-3xl'>Sorry!</h1>
        <p className='text-xl mb-3'>We can't find that page...</p>
    </div>
  )
}

export default PageNotFound