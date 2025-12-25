import { ArchiveBoxIcon, ArrowLeftEndOnRectangleIcon, ChartBarIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import baseUrl from '../../utils/baseurl';

const Aside = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const showAdd = () => {
        document.getElementById('add_modal').showModal();
    }
    const logoutUser = async () => {
        if (window.confirm("Are you sure to logout?")) {
            const token = localStorage.getItem('authToken');
            
            try {
                const response = await fetch(`${baseUrl}/logout`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    redirect: 'follow'
                });
                
                // Always remove the token from localStorage on logout attempt
                localStorage.removeItem('authToken');
                
                if (response.ok) {
                    console.log("Logout successful");
                    // Force a full page reload to reset the application state
                    navigate('/login');
                } else {
                    // Even if the server logout fails, we still want to clear the token
                    console.error('Logout failed, but token was removed');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error during logout:', error);
                // Still redirect to login even if there's an error
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        }

    }
    return (
        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4">
            <div className="text-xl pb-2 border-b-2 border-primary">
                Manage Products
            </div>
            {/* show add product btn only on home page: */}
            {location.pathname === "/" && <li className='mt-2'><button onClick={showAdd}><PlusCircleIcon className='h-6 w-6' />Add Product</button></li>}
            <li className='mb-4 mt-2'><Link to={"/"}><ArchiveBoxIcon className='h-6 w-6' />My Products</Link></li>

            <div className="text-xl pb-2 border-b-2 border-primary">
                Manage Sales
            </div>
            <li className='mt-2'><Link to={"/newSales"}><PlusCircleIcon className='h-6 w-6' />New Sales</Link></li>
            <li className='mb-4 mt-2'><Link to={"/viewSales"}><ChartBarIcon className='h-6 w-6' />View Sales</Link></li>

            <div className="text-xl pb-2 border-b-2 border-primary">
                Manage Account
            </div>
            <li className='mt-2'><Link to={"/profile"}><UserCircleIcon className='h-6 w-6' />Profile</Link></li>
            <li className='mb-4 mt-2'><button onClick={logoutUser}><ArrowLeftEndOnRectangleIcon className='h-6 w-6' />Logout</button></li>

        </ul>
    )
}

export default Aside