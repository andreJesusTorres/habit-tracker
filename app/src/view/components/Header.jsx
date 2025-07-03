import React from 'react';
import { Button } from '../library';

export default function Header({ title, ArrowBack, onBack }) {
    return (
        <header className="p-4 bg-white shadow-md flex justify-center items-center mt-4 border-b">
            {ArrowBack && (
                <Button onClick={onBack} className="absolute left-4">
                    🔙
                </Button>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
        </header>
    );
}