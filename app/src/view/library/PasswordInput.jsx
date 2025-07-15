import { useState } from 'react';
import Input from './Input';

export default function PasswordInput({ placeholder }) {
    const [status, setStatus] = useState('😊');
    const [type, setType] = useState('password');

    const handleToggleClick = () => {
        setStatus(status === '😊' ? '🙃' : '😊');
        setType(type === 'password' ? 'text' : 'password');
    };

    return (
        <div className="relative w-full">
            <Input 
                type={type} 
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded pr-10" 
            />
            <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={handleToggleClick}
            >
                {status}
            </span>
        </div>
    );
}
