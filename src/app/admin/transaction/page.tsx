"use client"
import React, { useState } from 'react'
import useSWR from "swr"
import { fetcherWithAuth } from "@/services/fetcher";
import { API_V1_URL } from "@/constant/index";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import Pagination from "@/components/elements/table/pagination";
import RowBeforeLoad from "@/components/elements/table/rowBeforeLoad";
import { navigate } from "@/utils/actions/navigate";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const TransactionPage = () => {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const search = searchParams.get('search') ?? ""

    const [searchInput, setSearchInput] = useState(search);

    const router = useRouter();

    const currentPage = page ? parseInt(page) : 1 as number;
    const perPage = 10

    const route = '/admin/transaction'
    const queryParams = new URLSearchParams({
        per_page: perPage.toString(),
        search
    }).toString()

    const { data, error, isLoading } = useSWR(API_V1_URL + route + "?" + queryParams + "&page=" + page, fetcherWithAuth)

    let transactions = data?.data?.data;
    let totalPage = data?.data?.meta?.last_page ?? 1 as number;

    const handleSearch = () => {
        navigate(route + "?search=" + searchInput)
    }

    const handleInputChange = (event: any) => {
        setSearchInput(event.target.value);
    };

    const handleDeleteWithReload = async (id: string) => {
        if (confirm('Are you sure you want to delete?')) {
            await axios
                .delete(API_V1_URL + "/admin/transaction/" + id, {
                    headers: {
                        'Authorization': "Bearer " + Cookies.get('userToken')
                    }
                }).then(response => {
                    if (response.status != 200) alert(response.data?.message)
                    router.push("/admin/transaction");
                    return response.data
                }).catch(function (error) {
                    alert("Failed to delete")
                    console.error(error);
                });
        }
    };

    return (
        <main className="container mx-auto mt-12">
            <section className="m-5">
                <h2 className="text-3xl mb-5 font-semibold">Transaction</h2>

                <div className="mb-5 flex justify-between">
                    <div>
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                            <input type="text" value={searchInput} onChange={handleInputChange} placeholder="Search" className="outline-none focus:outline-none w-auto bg-gray-50 text-md hover:text-black focus:text-black rounded-l md:text-basecursor-default flex text-gray-500 px-4 border-gray-300 border-[0.5px]" name="custom-input-number" />
                            <button className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-auto rounded-r cursor-pointer px-4" onClick={handleSearch}>
                                <span className="m-auto font-medium">Search</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-x-2">
                        <button className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-auto rounded cursor-pointer px-4">
                            <span className="m-auto font-medium">Export</span>
                        </button>

                        <Link href={route + "/create"}>
                            <button className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-auto rounded cursor-pointer px-4">
                                <span className="m-auto font-medium">+ Create</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md mb-5">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">#</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Transaction Date</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Invoice</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Product</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Quantity</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Total</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Supplier</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Created By</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {error || isLoading
                                ? <RowBeforeLoad colSpan={9} error={error} isLoading={isLoading} />
                                : <TableRows items={transactions} perPage={perPage} currentPage={currentPage} url={route} onDelete={handleDeleteWithReload} />
                            }
                        </tbody>
                    </table>
                </div>

                {!error && <Pagination pageCount={totalPage} currentPage={currentPage} url={route} queryParams={queryParams} />}

            </section>

        </main>
    )
}

const TableRows = (
    { items, perPage, currentPage, url, onDelete }: { items: [], perPage: number, currentPage: number, url: string, onDelete: (id: string) => void }
) => {

    if (items.length == 0) {
        return <tr className="my-3"><td colSpan={9} className="text-center">No data</td></tr>
    }

    return (<>
        {items?.map((item: any, key: any) =>
            <tr className="hover:bg-gray-50" key={item.id}>
                <td className="px-6 py-4">{(currentPage - 1) * perPage + key + 1}</td>
                <td className="px-6 py-4">{item.paid_at}</td>
                <td className="px-6 py-4">{item.invoice_no}</td>
                <td className="px-6 py-4">
                    <span className="font-medium">{item.product.code}</span>
                    <br />{item.product.name}
                </td>
                <td className="px-6 py-4">x {item.quantity}</td>
                <td className="px-6 py-4">{item.total_price}</td>
                <td className="px-6 py-4">
                    <span className="font-medium">{item.product.supplier.code}</span>
                    <br />{item.product.supplier.name}
                </td>
                <td className="px-6 py-4 font-medium">{item.user.name}</td>
                <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                        <Link href={url + "/" + item.id}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                                x-tooltip="tooltip"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                            </svg>
                        </Link>
                        <button onClick={() => onDelete(item.id)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                                x-tooltip="tooltip"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        )}
    </>)
}
export default TransactionPage