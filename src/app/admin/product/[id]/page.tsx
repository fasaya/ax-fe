"use client"
import { API_V1_URL } from "@/constant";
import { navigate } from "@/utils/actions/navigate";
import axios from "axios";
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import useSWR from "swr";
import { fetcherWithAuth } from "@/services/fetcher";
import Link from "next/link";

const ProductDetailPage = ({ params }: {
    params: { id: string }
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const id = params.id

    // Get suppliers
    const { data: suppliersData, error: suppliersError, isLoading: suppliersIsLoading } = useSWR(API_V1_URL + '/admin/supplier', fetcherWithAuth)
    const suppliers = suppliersData?.data?.data ?? [];

    const { data, error, isLoading } = useSWR(API_V1_URL + "/admin/product/" + id, fetcherWithAuth)

    let product = data?.data;

    const onSubmit = async (formData: any) => {
        await axios
            .put(API_V1_URL + "/admin/product/" + id, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Cookies.get('userToken')
                }
            })
            .then(response => {
                if (response.status != 200) alert(response.data?.message)
                alert("Data successfully updated")
                // navigate('/admin/product')
                // return response.data
            }).catch(function (error) {
                alert(error.response.data.message)
                console.error(error);
            })
    };

    return (
        <main className="container mx-auto mt-12" >
            <section className="m-5">
                <h2 className="text-3xl mb-5 font-semibold">Product - Update</h2>

                <div className="my-6">
                    <Link href="/admin/product"
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        &lt; Back
                    </Link>
                </div>

                {isLoading || error
                    ? (isLoading ? <p>Loading...</p> : <p>Error</p>)
                    : (
                        <div className="mt-5 sm:w-full">
                            <form onSubmit={handleSubmit(onSubmit)}>

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
                                                defaultValue={product.code}
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
                                                defaultValue={product.name}
                                                required
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.name && <p>{errors.name.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                {...register('description', { required: 'Description is required' })}
                                                id="description"
                                                defaultValue={product.description}
                                                required
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.description && <p>{errors.description.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Stock
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="stock"
                                                type="stock"
                                                value={product.stock}
                                                readOnly
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.stock && <p>{errors.stock.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('price', { required: 'Price is required' })}
                                                id="price"
                                                type="number"
                                                defaultValue={product.price}
                                                required
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.price && <p>{errors.price.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="discounted_price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Discounted_price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('discounted_price', { required: 'Discounted_price is required' })}
                                                id="discounted_price"
                                                type="number"
                                                defaultValue={product.discounted_price}
                                                placeholder="Leave empty if not on discount"
                                                required
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.discounted_price && <p>{errors.discounted_price.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <hr />

                                    <div>
                                        <label htmlFor="supplier" className="block text-sm font-medium leading-6 text-gray-900">
                                            Supplier
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                {...register('supplier_id', { required: 'Supplier is required' })}
                                                id="supplier_id"
                                                name="supplier_id"
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                {suppliersError || suppliersIsLoading
                                                    ? (
                                                        isLoading
                                                            ? <option value="">Loading...</option>
                                                            : <option value="">Error fetching supplier</option>
                                                    )
                                                    : <option value="">-- Select supplier --</option>}

                                                {suppliers?.map((supplier: any) => (
                                                    <option key={supplier.id} value={supplier.id} selected={supplier.id == product.supplier_id}>{supplier.code} - {supplier.name}</option>
                                                ))}
                                            </select>
                                            {errors.supplier && <p>{errors.supplier.message?.toString()}</p>}
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
                    )}

            </section>
        </main>
    )
}

export default ProductDetailPage