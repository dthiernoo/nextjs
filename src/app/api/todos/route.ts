import { type NextRequest, NextResponse } from "next/server";
import { data } from "../data";



export async function GET(_request: Request) {
    return Response.json(data);
};

export async function POST(request: NextRequest) {
    const todo = await request.json();
    const newTodo = {
        id: data.length+1,
        ...todo
    }
    data.push(newTodo);
    return NextResponse.json(newTodo, {
        status: 201,
    })
}