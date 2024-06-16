import Cookies from 'js-cookie';
import { cookies } from "next/headers";
// import jwt from 'jsonwebtoken';

function isAuth() {
    const token = Cookies.get('userToken') ?? cookies().get('userToken')?.value

    // try {
    //     const decoded = jwt.verify(token, SECRET_KEY);
    //     return decoded;
    // } catch (err) {
    //     console.error('Token validation error:', err);
    //     return false;
    // }

    return token;

}

export default isAuth