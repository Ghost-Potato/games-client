export async function POST (req: Request) {
    //get credientials from form request
    const body = await req.json();

    //attempt authenticating user
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        credentials: 'include' //needed to get cookie w/jwt from api
    });

    //evaluate response
    if(!res.ok){
        const errorText = await res.text();
        console.log(`Login error: ${errorText}`);
        return new Response(errorText, { status: res.status});
    }
    return Response.json({ success: true});
}