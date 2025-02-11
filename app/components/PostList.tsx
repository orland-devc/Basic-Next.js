// app/components/PostList.tsx
'use client';

import React, { useEffect, useState } from 'react';

type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
};

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div className="text-center">Loading posts...</div>;
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto p-4">
        {posts.map((post) => (
            <article key={post.id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <time className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
            </time>
            </article>
        ))}
        </div>
    );
}