//nextjs.org/docs/app/guides/forms


export default function Register(){
    return(
        <main>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"></input>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"></input>
                <label htmlFor="password">Re-enter Password:</label>
                <input type="password" id="password" name="password"></input>
            </form>
        </main>
    )
}