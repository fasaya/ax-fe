"use client"
import { API_V1_URL } from "@/constant";
import { navigate } from "@/utils/actions/navigate";
import axios from "axios";
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

const SupplierCreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData: any) => {
        let response = await axios
            .post(API_V1_URL + "/admin/supplier", JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Cookies.get('userToken')
                }
            })
            .then(response => {
                if (response.status != 200) {
                    alert(response.data?.message)
                }

                navigate('/admin/supplier')

                return response.data
            }).catch(function (error) {
                alert(error.response.data.message)
                console.log('error', error);
            })
    };

    return (
        <main className="container mx-auto mt-12" >
            <section className="m-5">
                <h2 className="text-3xl mb-5 font-semibold">Supplier - Create</h2>

                <div className="mt-5 sm:w-full">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>

                        <div className="grid grid-cols-2 gap-20">

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                                        Code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('code', { required: 'Code is required' })}
                                            id="code"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.code && <p>{errors.code.message?.toString()}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            id="name"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && <p>{errors.name.message?.toString()}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            {...register('address', { required: 'Address is required' })}
                                            id="address"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        ></textarea>
                                        {errors.address && <p>{errors.address.message?.toString()}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('phone', { required: 'Phone is required' })}
                                            id="phone"
                                            type="phone"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.phone && <p>{errors.phone.message?.toString()}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('email', { required: 'Email is required' })}
                                            id="email"
                                            type="email"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.email && <p>{errors.email.message?.toString()}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="npwp" className="block text-sm font-medium leading-6 text-gray-900">
                                        NPWP
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('npwp', { required: 'Npwp is required' })}
                                            id="npwp"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.npwp && <p>{errors.npwp.message?.toString()}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="pic_name" className="block text-sm font-medium leading-6 text-gray-900">
                                        PIC Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('pic_name', { required: 'PIC name is required' })}
                                            id="pic_name"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && <p>{errors.name.message?.toString()}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="pic_phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        PIC Phone
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('pic_phone', { required: 'PIC phone is required' })}
                                            id="pic_phone"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && <p>{errors.name.message?.toString()}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="pic_email" className="block text-sm font-medium leading-6 text-gray-900">
                                        PIC Email Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('pic_email', { required: 'Pic_email is required' })}
                                            id="pic_email"
                                            type="email"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.pic_email && <p>{errors.pic_email.message?.toString()}</p>}
                                    </div>
                                </div>

                                <hr />

                                <div>
                                    <label htmlFor="preferred_payout" className="block text-sm font-medium leading-6 text-gray-900">
                                        Preferred payout payment
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            {...register('preferred_payout', { required: 'Preferred payout is required' })}
                                            id="preferred_payout"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        ></textarea>
                                        {errors.preferred_payout && <p>{errors.preferred_payout.message?.toString()}</p>}
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>

            </section>
        </main>
    )
}

export default SupplierCreatePage