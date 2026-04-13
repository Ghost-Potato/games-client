import { cookies } from 'next/headers';

//only works on next server components
interface AuthCheckProps {
    children: React.ReactNode;
}

export async function AuthCheck({ children } : AuthCheckProps) {
    //get all cookies from our domain
    const cookieStore = await cookies();

    //check for authToken cookie
    const authToken = cookieStore.get('authToken')?.value;

    if(!authToken) return null;
    return children;
}
