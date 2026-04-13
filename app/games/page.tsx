import { Game } from "@/types/game";
import Link from "next/link";
import { AuthCheck } from "../components/authCheck";

//skip pre-rendering to fix Vercel bug
export const dynamic = 'force-dynamic';

async function getGames(): Promise<Game[]> {
    const clientBaseUrl = (process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000').replace(/\/$/, '');
    try {
        // use router to call server api
        const res: Response = await fetch(`${clientBaseUrl}/api/games`);
        if (!res.ok) {
            return [];
        }

        // response is ok, so convert json to array of Game objects
        const games: Game[] = await res.json();
        return games;
    }
    catch {
        return [];
    }
}

export default async function Games() {
   // fetch data
   const games = await getGames();

   return (
        <main>
            <h1>Our Games</h1>
            {/* Authentication Check instead of using a conditional statement */}
            <AuthCheck>
                <Link href="/games/create" className="linkButton">Add a New Game</Link>
            </AuthCheck>
            {games.length === 0 && <p>No games available right now.</p>}
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