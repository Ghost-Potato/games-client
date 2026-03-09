// GET: /api/games/:id => fetch single game
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // read id from url params
    const { id } = await params;

    // call get with id on server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/games/${id}`);

    // error handle
    if (!res.ok) throw new Error('Failed to fetch game');

    // return game in json 
    return Response.json(await res.json());
}