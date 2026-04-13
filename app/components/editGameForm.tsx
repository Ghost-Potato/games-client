'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Game } from "@/types/game";
import { useAppContext } from "@/app/components/appContext";

export default function EditGameForm({game} : {game: Game}){
    //authentication global context
    const { isAuthenticated } = useAppContext();

    //instantiate router for redirecting after successful save
    const router = useRouter();

    //state vars
    const [title, setTitle] = useState<string>(game.title || ''); //can leave out the || for required items
    const [developer, setDeveloper] = useState<string>(game.developer || '');
    const [genre, setGenre] = useState<string>(game.genre || '');
    const [price, setPrice] = useState<string>(game.price?.toString || '');
    const [rating, setRating] = useState<string>(game.rating ||'');

    //state var key/val dictionary of validation errors inform
    const [errors, setErrors] = useState<Record<string,string>>({});

    //form val
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        //create new error key/val pair if title is empty
        if (!title.trim()){
            newErrors.title = 'Title is required';
        }
        if (!developer.trim()){
            newErrors.title = 'Developer is required';
        }
        if (!genre.trim()){
            newErrors.title = 'Genre is required';
        }

        //update error state dict
        setErrors(newErrors);

        //no new errors in dict
        if (Object.keys(newErrors).length === 0){
            return true;
        }
        else {
            return false;
        }
    }

    //submit
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {

        //disable form's default behavious; use TS to process instead
        e.preventDefault();

        if(!validate()){
            console.log('Invalid form');
            return;
        }
        else{
            //cal/ route 
            const res: Response = await fetch(`/api/games/${game._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title, developer, genre, price : price ? parseFloat(price) : null, rating
                })
            });
            if (!res.ok){
                alert('Failed to update game');
                return;
            }

            //refresh games list
            
            router.push('/games');
        }
    }
    
        if(!isAuthenticated) return(
        <main>
            <h1>Unauthorized</h1>
            <p>You must be logged in to create a game.</p>
        </main>
    )

    return(
        <main>
            <h1>Game Details</h1>
            {/* shortcut to create a form with 5 fieldsets: form>(fieldset>label+input)*5 */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="">Title:</label>
                    <input name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    {errors.title && <span className="error">{errors.title}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="developer">Developer:</label>
                    <input name="developer" id="developer" value={developer} onChange={(e) => setDeveloper(e.target.value)}/>
                    {errors.developer && <span className="error">{errors.developer}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="genre">Genre:</label>
                    <input name="genre" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
                    {errors.genre && <span className="error">{errors.genre}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="price">Price:</label>
                    <input name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" step="0.01"/>
                    {errors.price && <span className="error">{errors.price}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="rating">Rating:</label>
                    <input name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
                    {errors.rating && <span className="error">{errors.rating}</span>}
                </fieldset>
                <button>Update</button>
            </form>
        </main>
    )
}