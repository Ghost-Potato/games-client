'use client';

import { useRouter } from "next/navigation";

//component takes id prop --> pass to api for delete fn
export default function DeleteGameButton({id}: {id: string}) {
    const router = useRouter();

    const handleDelete = async() => {
        if(!confirm('Are you sure you want to delete this game?')) {
            return;
        }
        else{
            //call api here
            const res: Response = await fetch(`/api/games/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok){
                alert('Failed to delete game');
            }
            router.push('/games');
        }
    }

    return(
        <button onClick={handleDelete} className="delete">Delete</button>
    )
}