import { type NextRequest, NextResponse } from "next/server";
import { type Context } from "../../types";
import { data } from "../../data";


export async function GET(_request: NextRequest, context: Context) {
    const todoId =  context.params.todoId;
    const todo = data[parseInt(todoId)-1];
    return NextResponse.json(todo);
};

export async function PATCH(request: NextRequest, context: Context) {
    const ndata = await request.json();
    const todoId = parseInt(context.params.todoId);
    data[todoId-1].title = ndata?.title;
    data[todoId-1].description = ndata?.description;
    data[todoId-1].completed = ndata?.completed;
    return NextResponse.json(data[todoId-1], { status: 201 })
}

export async function DELETE(_request: NextRequest, context: Context) {
    const todoId = context.params.todoId;
    const removedData = data.splice(parseInt(todoId)-1, 1)[0];
    return NextResponse.json(removedData);
};