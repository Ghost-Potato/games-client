export default function CreateGame(){
    return(
        <main>
            <h1>Game Details</h1>
            {/* shortcut to create a form with 5 fieldsets: form>(fieldset>label+input)*5 */}
            <form action="">
                <fieldset>
                    <label htmlFor="">Title:</label>
                    <input name="title" id="title" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="publisher">Publisher:</label>
                    <input name="publisher" id="publisher" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="genre">Genre:</label>
                    <input name="genre" id="genre" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="price">Price:</label>
                    <input name="price" id="price" />
                </fieldset>
                <fieldset>
                    <label htmlFor="rating">Rating:</label>
                    <input name="rating" id="rating" />
                </fieldset>
            </form>
        </main>
    )
}