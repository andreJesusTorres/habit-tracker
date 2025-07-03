import { useNavigate } from "react-router-dom";

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
        <main className="p-4">
            <h1 className="text-center text-2xl font-bold">Hábitos</h1>
            <ul className="mt-4">
                {categories.map(category => (
                    <li
                        key={category.name}
                        className="flex items-center justify-between p-2 border rounded cursor-pointer"
                        onClick={() => navigate(`/habits/category/${category.name.toLowerCase().split(' ').join('-')}`)}
                    >
                        <span>{category.icon} {category.name}</span>
                        <span>➡️</span>
                    </li>
                ))}
            </ul>
        </main>
    );
}
