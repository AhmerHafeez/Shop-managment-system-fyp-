import { useState } from 'react'
import { setloginStatus, setIsAdmin } from "../../Redux/login/isLogin";
import { useDispatch } from 'react-redux';
import baseurl from '../../utils/baseurl';

import { useForm } from 'react-hook-form';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

const AdminSignin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [eyePassword, seteyePassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateEmail = (email) => {
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            return "Invalid email format";
        }
    }

    const validatePassword = (password) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':",.<>/?])(?!.*\s).{8,}$/g;
        if (!password.match(regex)) {
            return "invalid password format";
        }
    }

    const loginAdmin = async (obj) => {
        try {
            const response = await fetch(`${baseurl}/admin/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            });
            
            const result = await response.json();
            
            if (result.status && result.token) {
                localStorage.setItem('authToken', result.token);
                // determine admin role from response (assumes result.user.role exists)
                const isAdmin = !!(result.user && result.user.role === 'admin');
                localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
                dispatch(setloginStatus(true));
                dispatch(setIsAdmin(isAdmin));
                toast.success("Login success");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                toast.error(result.message || "Invalid credentials");
                console.log('Error::AdminSignin::loginAdmin::result', result.message);
            }
        } catch (error) {
            toast.error("Something went wrong! try again");
            console.log('Error::AdminSignin::loginAdmin', error);
        }
    }

    const onSubmit = (data) => {
        console.log(data);
        loginAdmin(data);
        return false;
    }

    return (
        <main className='px-4 md:w-2/3 md:mx-auto'>
            <div className="h2 text-center text-xl font-bold">Admin Signin</div>
            <div className='flex justify-center mx-auto mt-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:max-w-xs' autoComplete='off' noValidate>
                    {/* email */}
                    <label className={`input input-bordered flex items-center gap-2 rounded-lg ${errors.email ? "input-error" : "input-success"} `}>
                        <EnvelopeIcon className="h-4 w-4 opacity-70" />
                        <input type="text" name='email' className="grow bg-transparent " placeholder="Email"
                            {...register('email', { validate: validateEmail })} />
                    </label>
                    <div className="label-text text-xs text-error h-8 pt-2">
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    {/* password */}
                    <label className={`input input-bordered flex items-center gap-2 rounded-lg ${errors.password ? "input-error" : "input-success"} `}>
                        <KeyIcon className="h-4 w-4 opacity-70" />
                        <input type={eyePassword ? "text" : "password"} name='password' className="grow bg-transparent" placeholder="Password"
                            {...register('password', { validate: validatePassword })} />
                        {eyePassword ? <EyeIcon className="h-4 w-4 opacity-70" onClick={() => { seteyePassword(!eyePassword) }} />
                            :
                            <EyeSlashIcon className="h-4 w-4 opacity-70" onClick={() => { seteyePassword(!eyePassword) }} />}
                    </label>
                    <div className="label-text text-xs text-error h-8 pt-2">
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="label">
                        <span className="label-text text-xs text-gray-500">Min 8 chars and must include Uppercase, Lowercase, Number and Special character.</span>
                    </div>

                    <input type="submit" className='btn w-full lg:max-w-xs btn-primary mt-4' value="Signin" />
                </form>
            </div>

            <div className="more text-center mt-4">
                <div>Do not have an account? <span className='underline cursor-pointer' onClick={() => navigate("/admin/signup")}>Signup</span></div>
            </div>

            <Toaster />
        </main>
    )
}

export default AdminSignin