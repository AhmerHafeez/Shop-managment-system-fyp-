import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Aside from '../../Components/Aside/Aside';
import { useSelector } from 'react-redux';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import baseUrl from '../../utils/baseurl';
import toast from 'react-hot-toast';

const Profile = () => {
  const isLogin = useSelector((state) => state.login.loginStatus);
  const [user,setUser] = useState({
    email:"",
    products:[],
    sales:[]
  })
  const navigate = useNavigate();

  const getUser = async () => {
    const token = localStorage.getItem('authToken');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };
    
    try {
      const response = await fetch(`${baseUrl}/getUser`, requestOptions);
      const result = await response.json();
      
      if (result.status) {
        setUser(result.data);
      } else {
        toast.error(result.message || "Failed to fetch user data");
        console.error('Error::profile::result', result.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again");
      console.error('Error::profile::fetch', error);
    }
  }
  useEffect(() => {
    // check if login:
    if (!isLogin) {
      // not login, take to login page:
      navigate("/login")
    } else {
      // get user details:
      getUser()
    }
  }, [])
  return (
    <div className='md:w-[80%] md:mx-auto'>
      {/* main */}
      <div className="drawer lg:drawer-open">
        <input id="sidebar_drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-4">
          <h3 className='flex items-center gap-x-2'><span className='font-bold text-xl'>Profile</span></h3>
          <div className='mb-20'>
            <div className="box mt-4   rounded shadow-lg">
              <div className="w-full h-full items-center p-4">
                <UserCircleIcon className="w-14 h-14" />
                <div className=''>
                  <div>{user.email}</div>
                </div>

                <div className="section mt-8 text-sm flex gap-x-2">
                  <div className="products h-20 border rounded-lg p-2 w-1/2">
                    <div>Total Products:</div>
                    <div className='text-xl font-bold'> {user.products.length}</div>
                  </div>
                  <div className="sales h-20 border rounded-lg p-2 w-1/2">
                    <div>Total Sales:</div>
                    <div className='text-xl font-bold'> {user.sales.length} </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="drawer-side md:h-[80vh] h-full">
          <label htmlFor="sidebar_drawer" aria-label="close sidebar" className="drawer-overlay"></label>

          <Aside />

        </div>
      </div>
      {/* main end */}
    </div>
  )
}

export default Profile