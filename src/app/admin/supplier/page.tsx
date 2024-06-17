"use client"
import React, { useEffect, useState } from 'react'
import useSWR from "swr"
import { fetcherWithAuth } from "@/services/fetcher";
import { API_V1_URL } from "@/constant/index";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'


const PaginationItem = ({ pageCount, currentPage, url }: { pageCount: number, currentPage: number, url: string }) => {
    return (
        <>
            <li>
                <a href="#"
                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>

            {Array.from({ length: pageCount }, (_, index) => (
                <li key={index}>
                    <Link href={`${url}?page=${index + 1}`}
                        className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</Link>
                </li>
            ))}

            <li>
                <a href="#"
                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </>
    );
};

const SupplierPage = () => {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const currentPage = page ? parseInt(page) : 1 as number;
    console.log("currentPage", currentPage);

    const perPage = 10

    const { data, error, isLoading } = useSWR(API_V1_URL + '/admin/supplier?page=' + page, fetcherWithAuth)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    console.log(data.data);

    let suppliers = data.data?.data;
    let totalPage = data.data?.meta?.from ?? 1 as number;

    return (
        <main className="container mx-auto mt-12">
            <section className="m-5">
                <h2 className="text-3xl mb-5 font-semibold">Supplier</h2>

                <div className="mb-5">
                    <div className="custom-number-input h-10 w-3 ">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <input type="text" placeholder="Search" className="outline-none focus:outline-none w-auto bg-gray-50 text-md hover:text-black focus:text-black rounded-l md:text-basecursor-default flex text-gray-500 px-4 border-gray-300 border-[0.5px]" name="custom-input-number" />
                            <button data-action="increment" className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-auto rounded-r cursor-pointer px-4">
                                <span className="m-auto font-medium">Search</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md mb-5">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">#</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Code</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Contact</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">PIC</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {suppliers?.map((item: any, key: any) =>
                                <tr className="hover:bg-gray-50" key={item.id}>
                                    <td className="px-6 py-4">{(currentPage - 1) * perPage + key + 1}</td>
                                    <td className="px-6 py-4">{item.code}</td>
                                    <td className="px-6 py-4 font-semibold">{item.name}</td>
                                    <td className="px-6 py-4">{item.phone}<br />{item.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">{item.pic_name}</span>
                                        <br />{item.pic_email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-4">
                                            <a x-data="{ tooltip: 'Delete' }" href="#">
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
                                            </a>
                                            <a x-data="{ tooltip: 'Edite' }" href="#">
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
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4">Code</td>
                                <td className="px-6 py-4">Product Designer</td>
                                <td className="px-6 py-4">Product Designer</td>
                                <td className="px-6 py-4">Product Designer</td>
                                <td className="px-6 py-4">Product Designer</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <span
                                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                                        >
                                            Design
                                        </span>
                                        <span
                                            className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                        >
                                            Product
                                        </span>
                                        <span
                                            className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                                        >
                                            Develop
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-4">
                                        <a x-data="{ tooltip: 'Delete' }" href="#">
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
                                        </a>
                                        <a x-data="{ tooltip: 'Edite' }" href="#">
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
                                        </a>
                                    </div>
                                </td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>

                <div aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px">
                        <PaginationItem pageCount={totalPage} currentPage={currentPage} url="/admin/supplier" />

                        {/* <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#"
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li> */}
                        {/* 
                        <li>
                            <a href="#" aria-current="page"
                                className="bg-gray-300 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li> */}
                    </ul>
                </div>

            </section>

        </main>
    )
}


export default SupplierPage