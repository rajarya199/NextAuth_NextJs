import { NextRequest,NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

export async function POST(request:NextRequest){
    try{
        const{username,email,password}=await request.json()
        if(!email || !password || !username){
    return NextResponse.json(
        {error:" username, email and password are required"},
        {status:400}
    )
}
  if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

await connectToDatabase();
// Check for existing username or email

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
if(existingUser){
    return NextResponse.json(
        {error:"User already exists"},
        {status:400}
    )
}

const user = new User({ email, username, password });
await user.save(); // Triggers pre-save → hashes password
return NextResponse.json(
    {
    message:"user register successfully"},
    {status:201}
)
    }
    catch(error){
   console.error("Error in user registration:", error);
        return NextResponse.json(
            {error:"failed to register"},
            {status:400}
        )
    }
}