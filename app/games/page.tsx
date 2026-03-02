import {Game} from "@/types/game";

async function getGames(): Promise<Game[]>{
    //use router to call server api
    const res: Response = await fetch('http://localhost:3000/api/v1/games');
    if(!res.ok){
        throw new Error('Failed to fetch games')};
    //response good, convert json to array
    const games: Game[] = await res.json();
    return games;

}

export default async function Games(){
    return(
        <main>
            <h1>Our Games</h1>
            {games.map((game))}
        </main>
    )
}