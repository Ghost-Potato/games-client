// file used to make api calls to server at /api/v1/games (GET and POST)
export async function GET() {
    // make get req to fetch all games from express api.  read domain from env var
    console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}`)
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/games`);
    return Response.json(await res.json());
};