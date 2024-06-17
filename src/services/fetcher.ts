'use server'
import { getToken } from "@/utils/helpers/auth";
import axios from 'axios'

const fetcherWithAuth = async (url: string) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + getToken()
    }

    return await axios
        .get(url, {
            headers: headers
        })
        .then(response => {
            // console.log('response.data', response.data);
            return response.data
        })
}

// export const fetcher = async (url: string) => {

//     // const response = await axios.get(url, {
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //         Authorization: "Bearer " + getToken()
//     //     }
//     // });

//     const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             "Authorization": "Bearer " + getToken(),
//         },
//     });

//     // console.log("bitch", response);

//     const responseData = await response.json();
//     console.log("yeah", responseData);


//     return responseData;
// }


const fetcher = (url: string) => axios.get(url).then(response => response.data)

export { fetcher, fetcherWithAuth }