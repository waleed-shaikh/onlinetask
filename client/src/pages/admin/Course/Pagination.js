import React from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({totalCourse, coursePerPage, setCurrntPage}) => {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(totalCourse / coursePerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <>
    <div className='d-flex align-items-center justify-content-center'>
        <nav aria-label="Page navigation" className='p-3 border-1'>
            <ul className='pagination'>
                <li class="page-item"><Link className="page-link" to="#">Previous</Link></li>
                    {pageNumbers?.map((number)=>{
                        return <li class="page-item ">
                            <Link className="page-link" to="#" onClick={()=>{setCurrntPage(number)}}>
                                {number}
                            </Link >
                        </li>
                    })}
                <li class="page-item"><Link className="page-link" to="#">Next</Link></li>
            </ul>
        </nav>
    </div>
    </>
  )
}

export default Pagination
