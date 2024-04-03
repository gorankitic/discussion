
// components
import { Link } from "react-router-dom";
import PostsList from "../components/PostsList";
// assets
import { Plus } from "lucide-react";


const Homepage = () => {


    return (
        <main className="mt-4">
            <section className="flex justify-between mb-6">
                <h1 className="text-2xl font-medium">Ask questions, create a post</h1>
                <Link to="/create" className="btn flex items-center gap-1">
                    <Plus className="h-5 w-5" />
                    Ask question
                </Link>
            </section>
            <PostsList />
        </main>
    )
}

export default Homepage;