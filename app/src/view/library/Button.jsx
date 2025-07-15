export default function Button({ 
    type = 'button', 
    children, 
    onClick, 
    className = '',
    disabled = false,
    variant = 'primary',
    size = 'md',
    ...props 
}) {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        success: "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
        ghost: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
    };
    
    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg",
        xl: "px-8 py-5 text-xl"
    };
    
    const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    );
}
