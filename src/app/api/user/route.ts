import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {email, username, password} = body;

        //email
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if(existingUserByEmail) {
            return NextResponse.json({message: "User with this email already exists"}, {status: 409})
        }

        //username
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if(existingUserByEmail) {
            return NextResponse.json({message: "User with this username already exists"}, {status: 409})
        }


        const newUser = await db.user.create({
            data:{
                username,
                email,
                password
            }
        })
        return NextResponse.json({user: newUser, message: 'User created successfully'}, {status: 201})

    }catch(error){
        return NextResponse.json({message: "error"})
    }
}