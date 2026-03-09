import {Game} from "@/types/game";
import EditGameForm from "@/app/components/editGameForm";

export default async function EditGamePage({params}: {params: {id: string}}) {
    //read url from params
    const {id} = params;

    //fetch game
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/games/${id}`);

    if(!res.ok){
        return (<div>Game Not Found</div>);
    }

    //populate game from api response
    const game: Game = await res.json();

    return(
        <main>
            <EditGameForm game={game}/>
        </main>
    );
}