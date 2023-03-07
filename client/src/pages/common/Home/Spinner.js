import React from 'react'
import loading from './loading.gif';

const Spinner = (props) => {
    return (
      <div className='container text-center'>
            <img style={{width: "40px", height: "40px", marginBottom: "30px", marginTop: "30px"}} src={loading} alt="loading" />
      </div>
    )
}

export default Spinner