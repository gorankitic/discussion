// components
import CreateUpdatePost from "@/features/posts/CreateUpdatePost";
import PostsList from "@/features/posts/PostsList";

const Home = () => {
    return (
        <main className="flex-1">
            <section className="flex justify-between mb-6">
                <h1 className="text-xl font-medium">Ask questions, create a new post: </h1>
                <div className="flex gap-1 items-center py-1 px-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md focus:outline-none transition duration-100 cursor-pointer">
                    <CreateUpdatePost />
                </div>
            </section>
            <PostsList />
        </main>
    )
}

export default Home;