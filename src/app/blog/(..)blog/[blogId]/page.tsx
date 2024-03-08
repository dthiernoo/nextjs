export default function InterceptDetailBlog({ params: { blogId } }: { params: { blogId: string } }) {
    return <h1>Intercepted {blogId} </h1>
}