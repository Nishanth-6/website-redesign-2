import React from 'react';

// Reusable skeleton components for loading states
export function SkeletonCard({ className = '' }) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 ${className}`}>
            <div className="skeleton h-48 rounded-lg mb-4" />
            <div className="skeleton h-6 w-3/4 rounded mb-3" />
            <div className="skeleton h-4 w-full rounded mb-2" />
            <div className="skeleton h-4 w-2/3 rounded" />
        </div>
    );
}

export function SkeletonText({ lines = 3, className = '' }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`skeleton h-4 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
                />
            ))}
        </div>
    );
}

export function SkeletonAvatar({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    return (
        <div className={`skeleton rounded-full ${sizes[size]} ${className}`} />
    );
}

export function SkeletonPublication() {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-3 w-full">
                    <div className="flex gap-3">
                        <div className="skeleton h-6 w-16 rounded-md" />
                        <div className="skeleton h-6 w-24 rounded-full" />
                    </div>
                    <div className="skeleton h-6 w-full rounded" />
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-4 w-3/4 rounded" />
                </div>
                <div className="skeleton h-10 w-28 rounded-xl shrink-0" />
            </div>
        </div>
    );
}

export function SkeletonCourse() {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="skeleton w-10 h-10 rounded-lg" />
                        <div className="space-y-2">
                            <div className="skeleton h-5 w-48 rounded" />
                            <div className="skeleton h-4 w-24 rounded" />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="skeleton h-4 w-32 rounded" />
                        <div className="skeleton h-4 w-24 rounded" />
                    </div>
                </div>
                <div className="skeleton h-6 w-20 rounded-full" />
            </div>
        </div>
    );
}
