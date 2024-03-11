import { type NextRequest, NextResponse } from "next/server";
import { data } from "../data";



export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const filteredData = query ? data.filter(todo => todo.title.includes(query) || todo.description?.includes(query)) : data
    return Response.json(filteredData);
};

export async function POST(request: NextRequest) {
    const todo = await request.json();
    const newTodo = {
        id: data.length+1,
        ...todo
    }
    data.push(newTodo);
    return NextResponse.json(newTodo, {
        status: 200,
    })
}