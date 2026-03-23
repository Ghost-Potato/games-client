'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; 


export default function Login(){
    const router = useRouter();
    //state vars
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //state key/val dict of val errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    //validation functions
    const validate = () : boolean => {
        const newErrors: Record<string, string> = {};

        if(!username.trim()) newErrors.username = 'Username required';
        if(password.trim()) newErrors.password = 'Password required';

        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0) return true;

        return false;
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validate()) return;

        //form valid
        const res: Response = await fetch (`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        if(!res.ok){
            alert(res.text());
            return;
        }

        //ok => games
        router.push('/games');
    }

    return(
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value= {username} onChange={(e) => setUsername(e.target.value)}></input>
                {errors.username && <span className="error">{errors.username}</span>}
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value= {password} onChange={(e) => setPassword(e.target.value)}></input>
                {errors.password && <span className="error">{errors.password}</span>}
            </form>
            <button>Login</button>
        </main>
    )
}