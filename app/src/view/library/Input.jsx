export default function Input({ 
    type, 
    id, 
    placeholder, 
    value, 
    onChange, 
    name, 
    className = "",
    ...props 
}) {
    const baseClasses = "w-full px-3 py-2 border border-[#AEAEAE] rounded-lg text-base placeholder-[#9E9E9E] focus:outline-none focus:border-black focus:ring-1 focus:ring-black";
    const finalClasses = className ? `${baseClasses} ${className}` : baseClasses;

    return (
        <input 
            type={type} 
            id={id} 
            name={name}
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            className={finalClasses}
            {...props}
        />
    );
}