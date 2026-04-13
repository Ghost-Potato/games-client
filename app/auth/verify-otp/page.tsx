'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAppContext } from "@/app/components/appContext";


export default function VerifyOTP(){
    const router = useRouter();

    //app context for authentication state
    const { setIsAuthenticated, appUsername } = useAppContext();

    //state vars
    const [code, setCode] = useState<string>('');


    //state key/val dict of val errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    //validation functions
    const validate = () : boolean => {
        const newErrors: Record<string, string> = {};

        if(!code.trim()) newErrors.code = 'OTP required';

        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0) return true;

        return false;
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validate()) return;

        const username = appUsername?.toString();

        if(!username){
            setErrors({ code: 'Session expired. Please log in again.' });
            router.push('/auth/login');
            return;
        }

        //form valid
        const res: Response = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ code, username, appUsername: username })
        });

        if(!res.ok){
            alert(await res.text());
            return;
        }


        //ok => set global vars then games
        // setAppUsername(username);
        setIsAuthenticated(true);
        router.push('/games');
    }

    return(
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="code">OTP:</label>
                <input type="text" id="code" name="code" value= {code} onChange={(e) => setCode(e.target.value)}></input>
                {errors.code && <span className="error">{errors.code}</span>}
                <button type="submit">Login</button>
            </form>
        </main>
    )
}