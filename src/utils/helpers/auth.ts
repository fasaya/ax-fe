import Cookies from 'js-cookie';
import { cookies } from "next/headers";
// import jwt from 'jsonwebtoken';

function isAuth() {
    const token = Cookies.get('userToken') ?? cookies().get('userToken')?.value

    // Verify JWT:
    // try {
    //     const decoded = jwt.verify(token, SECRET_KEY);
    //     return decoded;
    // } catch (err) {
    //     console.error('Token validation error:', err);
    //     return false;
    // }

    return token;
}

function getToken() {
    const token = Cookies.get('userToken') ?? cookies().get('userToken')?.value

    // Verify JWT:
    // ...

    return token;
}

export { isAuth, getToken }