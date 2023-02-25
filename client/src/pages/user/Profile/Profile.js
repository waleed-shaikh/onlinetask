import React from 'react'
import { useSelector } from 'react-redux';
import PageTitle from '../../../components/PageTitle';

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  return ( 
    <div className='mt-3 h-screen'>
        <PageTitle title="My Profile"/>
        <div className="divider"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0 1 19.005 21H4.995A1.995 1.995 0 0 1 3 19.005V4.995zM6.357 18h11.49a6.992 6.992 0 0 0-5.745-3 6.992 6.992 0 0 0-5.745 3zM12 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>
        <h5 className='ps-2'>Name: {user?.name}</h5>
        <h5 className='ps-2'>Email Id: {user?.email}</h5>
        <h5 className='ps-2'>Mobile Number: {user?.number}</h5>
        <div className="divider"></div>
    </div>
  )
}

export default Profile
