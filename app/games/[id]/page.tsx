import { Game } from "@/types/game";
import DeleteGameButton from "@/app/components/deleteGameButton";
import Link from "next/link";
import { AuthCheck } from "@/app/components/authCheck";

// call route which calls api to fetch game data
async function getGame(id: string): Promise<Game> {
    const clientBaseUrl = (process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000').replace(/\/$/, '');
    const res: Response = await fetch(`${clientBaseUrl}/api/games/${id}`);
    if (!res.ok) { throw new Error('Could not fetch game') };
    return res.json();
}

export default async function GameDetails({ params } : {params: Promise<{ id: string }>} ) {
    // try to fetch game before rendering output
    const { id } = await params;
    let game: Game | null = null;

    try {
        game = await getGame(id);
    }
    catch {
        return (
            <main>
                <h1>Game Not Found</h1>
            </main>
        );
    }

    return (
        <main>
            <h1>Game Details</h1>
            <article className="card">
                <h3>{game.title}</h3>
                <p>{game.developer}</p>
                <p>{game.genre}</p>
                <p>{game.price}</p>
                <p>Rating: {game.rating}</p>
                <AuthCheck>
                    <Link href={`/games/edit/${game._id}`} className="linkButton">Edit</Link>
                    <DeleteGameButton id={game._id} />
                </AuthCheck>
            </article>
        </main>
    );
}
