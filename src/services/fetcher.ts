'use server'
import { getToken } from "@/utils/helpers/auth";
import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then(response => response.data)

const fetcherWithAuth = async (url: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + getToken()
    }

    return await axios
        .get(url, {
            headers: headers
        })
        .then(response => response.data)
}

export { fetcher, fetcherWithAuth }