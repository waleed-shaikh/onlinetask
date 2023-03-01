import React from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({totalCourse, coursePerPage, setCurrntPage, currentPage}) => {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(totalCourse / coursePerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <>
    <div className='d-flex align-items-center justify-content-center'>
        <nav aria-label="Page navigation" className='p-3 border-1'>
            <ul className='pagination'>
            <button className="page-item page-link" disabled={currentPage === 1} onClick={()=>{setCurrntPage(currentPage-1)}}>Previous</button>
                    {pageNumbers?.map((number)=>{
                        return <button className="page-item page-link" onClick={()=>{setCurrntPage(number)}}>
                            {number}
                        </button>
                    })}
            <button className="page-item page-link" disabled={currentPage === Math.ceil(totalCourse / coursePerPage)} onClick={()=>{setCurrntPage(currentPage+1)}}>Next</button>
            </ul>
        </nav>
    </div>
    </>
  )
}

export default Pagination
