// app/components/CreatePost.tsx
'use client';

import React, { useState } from 'react';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            title,
            content,
            published: true,
            }),
        });

        if (response.ok) {
            setTitle('');
            setContent('');
        }
        } catch (error) {
        console.error('Error creating post:', error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
        <div>
            <label htmlFor="title" className="block text-xl font-medium text-gray-700">
                Title
            </label>
            <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full text-gray-700 text-xl rounded-md border-2 border-gray-200 px-4 py-2 focus:outline-yellow-500"
            required
            />
        </div>
        <div>
            <label htmlFor="content" className="block text-xl font-medium text-gray-700">
                Content
            </label>
            <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full text-gray-700 text-xl rounded-md border-gray-300 shadow-sm focus:outline-yellow-500 px-4 py-2"
            required
            />
        </div>
        <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50"
        >
            {isLoading ? 'Creating...' : 'Create Post'}
        </button>
        </form>
    );
}