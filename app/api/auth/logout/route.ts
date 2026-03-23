export async function GET(req: Request) {
    //get req header w/cookie
    const cookieHeader: string = req.headers.get('cookie') || '';

    //pass cookie w/jwt to server api, so it can delete the cookie
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/logout`, {
        headers: { 'Cookie': cookieHeader }
    })

    if(!res.ok) throw new Error('Failed to logout');

    //clear cookie on client so user no longer authenticated by setting Max-Age = 0. Cookie has no content and expires.
    const data = await res.json();
    const response = Response.json(data);
    response.headers.set('Set-Cookie', 'authToken=; Path=/; Max-Age=0');
    return response;
    
}