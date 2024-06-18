'use client'
import { API_V1_URL } from "@/constant";
import { navigate } from "@/utils/actions/navigate";
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useState } from "react";

export default function ProductImportPage() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleDownload = async () => {
        try {
            axios.get(API_V1_URL + "/admin/product/download-import-template", {
                responseType: 'blob',
                headers: {
                    'Authorization': "Bearer " + Cookies.get('userToken')
                }
            }).then(response => {
                const url = window.URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'import-product.xlsx');
                document.body.appendChild(link);
                link.click();
            }).catch(function (error) {
                console.error(error);
            })
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios
                .post(API_V1_URL + "/admin/product/import", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Bearer " + Cookies.get('userToken')
                    },
                }).then(response => {
                    setMessage(response.data.message);
                    navigate('/admin/product')
                }).catch(function (error) {
                    alert(error.response.data.message)
                });

        } catch (error) {
            setMessage('File upload failed');
        }
    };

    return (
        <main className="container mx-auto mt-12" >
            <section className="m-5">
                <h2 className="text-3xl mb-5 font-semibold">Product - Import</h2>

                <div className="my-6">
                    <Link href="/admin/product"
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        &lt; Back
                    </Link>
                </div>

                <div className="mb-5">
                    <button onClick={() => handleDownload()} className="text-emerald-600 hover:text-emerald-400">Download excel import template</button>
                </div>

                <hr />

                <div className="mt-5">
                    <div className="text-2xl mb-5">Upload</div>
                    <div className="relative inline-block">
                        <input type="file" className="file:absolute file:right-0 file:bg-gray-400 file:text-white file:border-0 file:py-0 file:px-3l text-gray-300 file:rounded" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
                    </div>
                    <br />
                    <button onClick={handleUpload} className="bg-emerald-600 hover:bg-emerald-400 text-white px-2 py-1 rounded mt-3 shadow-x">Upload</button>
                    {message && <p>{message}</p>}
                </div>

            </section>

        </main>
    )
}
