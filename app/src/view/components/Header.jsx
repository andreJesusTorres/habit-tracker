import React from 'react';
import { Button } from '../library';

export default function Header({ title, ArrowBack, onBack, subtitle }) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 py-3 flex items-center justify-between">
                {ArrowBack && (
                    <Button 
                        onClick={onBack} 
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <span className="text-xl">←</span>
                    </Button>
                )}
                
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                
                {/* Espacio para mantener el título centrado */}
                {ArrowBack && <div className="w-10"></div>}
            </div>
        </header>
    );
}