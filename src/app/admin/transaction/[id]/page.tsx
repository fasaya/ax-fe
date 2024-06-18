"use client"
import { API_V1_URL } from "@/constant";
import { navigate } from "@/utils/actions/navigate";
import axios from "axios";
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Link from "next/link";
import useSWR from "swr";
import { fetcherWithAuth } from "@/services/fetcher";

const TransactionUpdatePage = ({ params }: {
    params: { id: string }
}) => {
    const id = params.id

    // Get transaction
    const { data: transactionData, error: transactionError, isLoading: transactionIsLoading } = useSWR(API_V1_URL + '/admin/transaction/' + id, fetcherWithAuth)
    const transaction = transactionData?.data

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Get product
    const { data: productData, error: productError, isLoading: productIsLoading } = useSWR(API_V1_URL + '/admin/product', fetcherWithAuth)
    const products = productData?.data?.data ?? [];


    const onSubmit = async (formData: any) => {
        console.log("sub");
        await axios
            .put(API_V1_URL + "/admin/transaction/" + id, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Cookies.get('userToken')
                }
            })
            .then(response => {
                console.log(response);
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
                <h2 className="text-3xl mb-5 font-semibold">Transaction - Update</h2>

                <div className="my-6">
                    <Link href="/admin/transaction"
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        &lt; Back
                    </Link>
                </div>

                <div className="mt-5 sm:w-full">

                    {transactionIsLoading || transactionError
                        ? (transactionIsLoading ? <p>Loading...</p> : <p>Error</p>)
                        : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="invoice_no" className="block text-sm font-medium leading-6 text-gray-900">
                                            Invoice No/Code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('invoice_no', { required: 'Invoice_no is required' })}
                                                id="invoice_no"
                                                defaultValue={transaction.invoice_no}
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
                                                // {...register('product_id', { required: 'Product is required' })}
                                                id="product_id"
                                                name="product_id"
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                disabled={true}
                                                value={transaction.product_id}
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
                                                // {...register('quantity', { required: 'Quantity is required' })}
                                                id="quantity"
                                                type="number"
                                                value={transaction.quantity}
                                                min="1"
                                                required
                                                readOnly
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.quantity && <p>{errors.quantity.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="item_price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Item price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('item_price', { required: 'Item price is required' })}
                                                id="item_price"
                                                type="number"
                                                defaultValue={transaction.item_price}
                                                readOnly
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.item_price && <p>{errors.item_price.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="total_price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Total price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('total_price', { required: 'Item price is required' })}
                                                id="total_price"
                                                type="number"
                                                defaultValue={transaction.total_price}
                                                readOnly
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.total_price && <p>{errors.total_price.message?.toString()}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="paid_at" className="block text-sm font-medium leading-6 text-gray-900">
                                            Transaction Date
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('paid_at', { required: 'Transaction date is required' })}
                                                id="paid_at"
                                                type="datetime-local"
                                                defaultValue={transaction.paid_at}
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.paid_at && <p>{errors.paid_at.message?.toString()}</p>}
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
                        )
                    }


                </div>

            </section>
        </main>
    )
}

export default TransactionUpdatePage