import Form from 'next/form'
export default function Login(formData: FormData){
    return(
        <main>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"></input>
            </form>
        </main>
    )
}