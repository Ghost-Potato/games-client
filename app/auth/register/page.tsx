//nextjs.org/docs/app/guides/forms
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; 


export default function Register(){
    const router = useRouter();
    //state vars
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    //state key/val dict of val errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    //validation functions
    const validate = () : boolean => {
        const newErrors: Record<string, string> = {};

        if(!username.trim()) newErrors.username = 'Username required';
        if(password.trim().length < 8) newErrors.password = 'Password must be min 8 characters';
        if(password !== confirm) newErrors.confirm = 'Passwords do not match';

        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0) return true;

        return false;
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validate()) return;

        //form valid
        const res: Response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        if(!res.ok){
            alert(await res.text());
            return;
        }

        //ok => login
        router.push('/auth/login');
    }

    return(
        <main>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value= {username} onChange={(e) => setUsername(e.target.value)}></input>
                {errors.username && <span className="error">{errors.username}</span>}
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value= {password} onChange={(e) => setPassword(e.target.value)}></input>
                {errors.password && <span className="error">{errors.password}</span>}
                <label htmlFor="password">Re-enter Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword"value= {confirm} onChange={(e) => setConfirm(e.target.value)}></input>
                {errors.confirm && <span className="error">{errors.confirm}</span>}
                <button type="submit">Register</button>
            </form>
        </main>
    )
}