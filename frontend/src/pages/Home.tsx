// components
import CreatePostButton from "@/features/posts/CreatePostButton";
import PostsList from "@/features/posts/PostsList";

const Home = () => {

    return (
        <main className="flex-1">
            <section className="flex justify-between mb-6">
                <h1 className="text-xl font-medium">Ask questions, create a new post: </h1>
                <CreatePostButton />
            </section>
            <PostsList />
        </main>
    )
}
export default Home;