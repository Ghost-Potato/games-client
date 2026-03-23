// file used to make api calls to server at /api/v1/games (GET and POST)
export async function GET() {
    // make get req to fetch all games from express api.  read domain from env var
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/games`);

    //api call fails
    if (!res.ok) {
        const errorText = await res.text();
        console.log(`API GET Error: ${errorText}`);
        return new Response(errorText, { status: res.status });
    }

    return Response.json(await res.json());
};

export async function POST(req: Request) {
    // read request body as json
    const body = await req.json();

    // call server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    // api call fails
    if (!res.ok) {
        const errorText = await res.text();
        console.log(`API POST Error: ${errorText}`);
        return new Response(errorText, { status: res.status });
    }

    // api call succeeds and returns only 201 created
    return Response.json({ success: true });
}