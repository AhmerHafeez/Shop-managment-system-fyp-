import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from '../../utils/baseurl';
// import { setProducts } from '../../Redux/products/productSlice';

const ModalAdd = (props) => {
    const products = useSelector((state) => state.product.products);
    // const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const validateP_name = (p_name) => {
        if (!(String(p_name).trim())) {
            return "Name cannot be empty";
        };
    }
    const validateP_price = (p_price) => {
        if (!(String(p_price).trim())) {
            return "Price cannot be empty";
        };
        if (p_price <= 0) {
            return "Invalid Price";
        };
    }
    const validateP_stock = (p_stock) => {
        if (!(String(p_stock).trim())) {
            return "Stock cannot be empty";
        };
        if (p_stock < 0) {
            return "Invalid Stock";
        };
    }

    const onSubmit = async (data) => {
        console.log(data);
        const token = localStorage.getItem('authToken');
        
        try {
            const response = await fetch(`${baseUrl}/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
                redirect: 'follow'
            });
            
            const result = await response.json();
            
            if (result.status) {
                toast.success("Product added successfully");
                // to refresh,
                props.fetchProducts();
            } else {
                toast.error(result.message || "Something went wrong! Please try again");
                console.error('Error::Modal Add::result', result.message);
            }
        } catch (error) {
            toast.error("Something went wrong! Please try again");
            console.error('Error::Modal Add::', error);
        } finally {
            // close dialog
            const f = document.getElementById("addFormModal");
            if (f) f.reset();
            const modal = document.getElementById(props.id);
            if (modal) modal.close();
        }
    }

    const clearForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const f = document.getElementById("addFormModal");
        f.reset();
        // close dialog
        document.getElementById(props.id).close();
    }

    return (
        <div>
            <dialog id={props.id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{props.title}</h3>

                    <form method="dialog" onSubmit={handleSubmit(onSubmit)} id='addFormModal'>
                        <div>
                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Product No</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full lg:max-w-xs" disabled value={products.length + 1} />
                            </label>
                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Product Name</span>
                                </div>
                                <input type="text"
                                    {...register('p_name', { validate: validateP_name })}
                                    name='p_name' placeholder="Type here" className="input input-bordered w-full lg:max-w-xs" />
                            </label>
                            {errors.p_name && <p className='text-xs text-red-600 ps-2 mt-1'>{errors.p_name.message}</p>}

                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Enter Price</span>
                                </div>
                                <input type="number"
                                    {...register('p_price', { validate: validateP_price })}
                                    min={1} name='p_price' placeholder="Type here" className="input input-bordered w-full lg:max-w-xs" />
                            </label>
                            {errors.p_price && <p className='text-xs text-red-600 ps-2 mt-1'>{errors.p_price.message}</p>}


                            <label className="form-control w-full lg:max-w-xs px-2">
                                <div className="label">
                                    <span className="label-text">Enter Stock</span>
                                </div>
                                <input type="number"
                                    {...register('p_stock', { validate: validateP_stock })}
                                    min={1} name='p_stock'
                                    placeholder="Type here" className="input input-bordered w-full lg:max-w-xs " />
                            </label>
                            {errors.p_stock && <p className='text-xs text-red-600 ps-2 mt-1'>{errors.p_stock.message}</p>}
                        </div>
                        <div className="modal-action">
                            <div>
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn mx-2 px-6 btn-sm btn-primary text-white">Add</button>
                                <button className="btn mx-2 px-6 btn-sm" onClick={clearForm}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>

            <Toaster />
        </div>
    )
}

export default ModalAdd