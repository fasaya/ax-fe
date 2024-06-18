"use client"
import { API_V1_URL } from "@/constant";
import { navigate } from "@/utils/actions/navigate";
import axios from "axios";
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Link from "next/link";
import useSWR from "swr";
import { fetcherWithAuth } from "@/services/fetcher";
import { useEffect, useState } from "react";

const TransactionCreatePage = () => {
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Get product
    const { data: productData, error: productError, isLoading: productIsLoading } = useSWR(API_V1_URL + '/admin/product', fetcherWithAuth)
    const products = productData?.data?.data ?? [];


    // Handle product selection change
    const handleProductChange = (event: any) => {
        setSelectedProductId(event.target.value);
    };

    // Handle quantity input change
    const handleQuantityChange = (event: any) => {
        setQuantity(Number(event.target.value));
    };

    // Calculate the total price whenever the selected product or quantity changes
    useEffect(() => {
        if (selectedProductId !== '') {
            const product = products.find((p: any) => p.id == selectedProductId);
            if (product) {
                const price = product.discounted_price || product.price;
                setTotalPrice(price * quantity);
            }
        }
    }, [selectedProductId, quantity]);



    const onSubmit = async (formData: any) => {
        await axios
            .post(API_V1_URL + "/admin/transaction", JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Cookies.get('userToken')
                }
            })
            .then(response => {
                if (response.status != 200) {
                    alert(response.data?.message)
                }

                navigate('/admin/transaction')

                return response.data
            }).catch(function (error) {
                alert(error.response.data.message)
                console.error(error);
            })
    };

    return (
        <main className="container mx-auto mt-12" >
            <section className="m-5">
                <h2 className="text-3xl mb-5 font-semibold">Transaction - Create</h2>

                <div className="my-6">
                    <Link href="/admin/transaction"
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        &lt; Back
                    </Link>
                </div>

                <div className="mt-5 sm:w-full">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="invoice_no" className="block text-sm font-medium leading-6 text-gray-900">
                                    Invoice No/Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('invoice_no', { required: 'Invoice_no is required' })}
                                        id="invoice_no"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.invoice_no && <p>{errors.invoice_no.message?.toString()}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product
                                </label>
                                <div className="mt-2">
                                    <select
                                        {...register('product_id', { required: 'Product is required' })}
                                        id="product_id"
                                        name="product_id"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleProductChange}
                                        value={selectedProductId}
                                    >
                                        {productError || productIsLoading
                                            ? (
                                                productIsLoading
                                                    ? <option value="">Loading...</option>
                                                    : <option value="">Error fetching product</option>
                                            )
                                            : <option value="">-- Select product --</option>}

                                        {products?.map((product: any) => (
                                            <option key={product.id} value={product.id}>{product.code} - {product.name}</option>
                                        ))}
                                    </select>
                                    {errors.product && <p>{errors.product.message?.toString()}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('quantity', { required: 'Quantity is required' })}
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        required
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.quantity && <p>{errors.quantity.message?.toString()}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="total_price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Total price
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="total_price"
                                        type="number"
                                        value={totalPrice}
                                        readOnly
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.total_price && <p>{errors.total_price.message?.toString()}</p>}
                                </div>
                            </div>

                            <hr />


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

export default TransactionCreatePage