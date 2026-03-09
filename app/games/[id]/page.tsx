import { Game } from "@/types/game";
import DeleteGameButton from "@/app/components/deleteGameButton";
import Link from "next/link";

// call route which calls api to fetch game data
async function getGame(id: string): Promise<Game> {
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/games/${id}`);
    if (!res.ok) { throw new Error('Could not fetch game') };
    return res.json();
}

export default async function GameDetails({ params } : {params: Promise<{ id: string }>} ) {
    // try to fetch game before rendering output
    const { id } = await params;

    try {
        const game = await getGame(id);

        return (
            <main>
                <h1>Game Details</h1>
                <article className="card">
                    <h3>{game.title}</h3>
                    <p>{game.developer}</p>
                    <p>{game.genre}</p>
                    <p>{game.price}</p>
                    <p>Rating: {game.rating}</p>
                    <Link href={`/games/edit/${game._id}`} className="linkButton">Edit</Link>
                </article>
            </main>
        );
    }
    catch (Error) {
        return (
            <main>
                <h1>Game Not Found</h1>
            </main>
        );
    }    
}
