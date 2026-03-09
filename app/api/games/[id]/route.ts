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

//DELETE: /api/games/:id => delete selected game
export async function DELETE(req: Request, {params}:{params: Promise<{id: string}>}) {
    //read id from url params
    const {id} = await params;

    //call delete with id on server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/games/${id}`,
        {method: 'DELETE'}
    );

    //error handle
    if(!res.ok){
        throw new Error('Failed to delete game');
    }
    return new Response(null, {status: 204});
}

//PUT: /api/games/:id => update selected game
export async function PUT(req: Request, {params}:{params: Promise<{id: string}>}) {
    //read id from url params
    const {id} = await params;

    //get request body
    const body = req.body;

    //call delete with id on server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/games/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    //error handle
    if(!res.ok){
        throw new Error('Failed to edit game');
    }
    return new Response(null, {status: 204});
}