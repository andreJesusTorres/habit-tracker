import capitalize from '../../util/capitalize';

export default function DayCircle({ date, isSelected, onClick }) {
    const isToday = date.toDateString() === new Date().toDateString();
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

    const getDayStyles = () => {
        let baseStyles = "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200 cursor-pointer text-sm sm:text-base";
        
        if (isSelected) {
            return `${baseStyles} bg-blue-500 text-white border-blue-500 shadow-lg transform scale-110`;
        } else if (isToday) {
            return `${baseStyles} bg-green-100 text-green-700 border-green-400 hover:bg-green-200`;
        } else if (isPast) {
            return `${baseStyles} bg-gray-100 text-gray-400 border-gray-300`;
        } else {
            return `${baseStyles} bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400`;
        }
    };

    const getDayNameStyles = () => {
        let baseStyles = "text-xs font-medium mb-1";
        
        if (isSelected) {
            return `${baseStyles} text-blue-600`;
        } else if (isToday) {
            return `${baseStyles} text-green-600`;
        } else if (isPast) {
            return `${baseStyles} text-gray-400`;
        } else {
            return `${baseStyles} text-gray-500`;
        }
    };

    return (
        <div className="flex flex-col items-center" onClick={onClick}>
            <span className={getDayNameStyles()}>
                {capitalize(date.toLocaleDateString('es-ES', { weekday: 'short' }))}
            </span>
            <div className={getDayStyles()}>
                {date.getDate()}
            </div>
        </div>
    );
}