import { Game } from "@/types/game";
import Link from "next/link";

//skip pre-rendering to fix Vercel bug
export const dynamic = 'force-dynamic';

async function getGames(): Promise<Game[]> {
     // use router to call server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/games`);
    if (!res.ok) { throw new Error('Failed to fetch games') };

    // response is ok, so convert json to array of Game objects
    const games: Game[] = await res.json();
    return games;
}

export default async function Games() {
   // fetch data
   const games = await getGames();

   return (
        <main>
            <h1>Our Games</h1>
            <Link href="/games/create" className="linkButton">Add a New Game</Link>
            <ul>
                {games.map((game) => (
                    <li key={game._id} className="card">
                        <h3>{game.title}</h3>
                        <Link href={`/games/${game._id}`}>
                            <button>View Details</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
   );
}