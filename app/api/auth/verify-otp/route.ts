export async function POST(req: Request) {
    //get otp from body
    const body = await req.json();
    
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
    });

    if(!res.ok){
        const errorText = await res.text();
        console.log(`OTP Verification error: ${errorText}`);
        return new Response(errorText, { status: res.status });
     }
    //api call succeeds and returns 200, plus header containing our cookie jwt
    //need to pass cookie to client so we have it for private API calls
    const setCookieHeader = res.headers.get('set-cookie');
    const responseHeaders = new Headers();

    if(setCookieHeader){
        responseHeaders.set('Set-Cookie', setCookieHeader);
    }
    return Response.json({ success: true }, { headers: responseHeaders });
}