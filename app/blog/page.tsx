// app/blog/page.tsx
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';

export default function Blog() {
    return (
        <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 px-4">
            <h1 className="text-4xl bg-gradient-to-r from-red-500 bg to-yellow-400 bg-clip-text text-transparent font-bold text-center mb-8">Blog</h1>
            <CreatePost />
            <div className="my-8">
            <PostList />
            </div>
        </div>
        </div>
    );
}