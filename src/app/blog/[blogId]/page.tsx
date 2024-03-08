import Link from "next/link";

type DetailArticleProps = {
    params: {
        blogId: string
    }
}

export default function DetailArticle({ params }: DetailArticleProps) {
    return <h1>Blog Article N: {params.blogId} <Link href={`/blog/${params.blogId}/settings`} >Settings</Link> </h1>;
}