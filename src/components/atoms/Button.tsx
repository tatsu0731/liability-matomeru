import React from 'react';

interface ButtonProps {
    title: string;
    size: string;
    color: string;
}

export default function Button({ title, size, color }: ButtonProps) {
    return <button className={`font-bold text-white text-${size} bg-${color}-400 py-2 px-8 bg-orange-4000 rounded-lg shadow hover:bg-${color}-600`}>{title}</button>
}