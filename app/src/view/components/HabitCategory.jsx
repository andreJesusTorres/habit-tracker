import { useNavigate } from "react-router-dom";
import Header from "./Header";
import capitalize from '../../util/capitalize';

const categories = [
    { name: "Salud y Bienestar", icon: "🧘" },
    { name: "Actividad Física", icon: "🏋️" },
    { name: "Desarrollo Personal", icon: "📖" },
    { name: "Hábitos Negativos", icon: "❌" },
    { name: "Finanzas", icon: "📊" },
    { name: "Sociales", icon: "👥" }
];

export default function HabitCategory() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header title="Categorías de Hábitos" ArrowBack onBack={() => navigate('/habits')} />
            <div className="p-4 max-w-lg mx-auto">
                <ul className="space-y-4 mt-6">
                    {categories.map(category => (
                        <li
                            key={category.name}
                            className="bg-white rounded-lg shadow-sm border-2 p-4 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                            onClick={() => navigate(`/habits/category/${category.name.toLowerCase().split(' ').join('-')}`)}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{category.icon}</span>
                                <span className="font-semibold text-gray-800 text-lg">{capitalize(category.name)}</span>
                            </div>
                            <span className="text-gray-400 text-xl group-hover:text-blue-500 transition-colors">→</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
