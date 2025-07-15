import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../library";

const icons = {
    goals: '🎯',
    progress: '📊',
    habits: '⭐',
    diary: '📅',
    settings: '⚙️',
};

const labels = {
    goals: 'Metas',
    progress: 'Progreso',
    habits: 'Hábitos',
    diary: 'Diario',
    settings: 'Ajustes',
};

const routes = [
    { path: '/goals', key: 'goals' },
    { path: '/progress', key: 'progress' },
    { path: '/habits', key: 'habits' },
    { path: '/diary', key: 'diary' },
    { path: '/settings', key: 'settings' },
];

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <footer className="fixed bottom-0 left-0 w-full z-50">
            <div className="backdrop-blur-md bg-white/80 border-t border-gray-200 shadow-lg">
                <nav className="flex justify-around items-end py-2 px-1">
                    {routes.map(({ path, key }) => (
                        <button
                            key={key}
                            onClick={() => navigate(path)}
                            className={`flex flex-col items-center group focus:outline-none transition-all duration-200 ${isActive(path) ? 'scale-110' : 'opacity-80 hover:scale-105'} `}
                            style={{ minWidth: 60 }}
                        >
                            <span
                                className={`text-3xl mb-1 transition-all duration-200 ${isActive(path) ? 'drop-shadow-lg' : ''}`}
                                aria-label={labels[key]}
                            >
                                {icons[key]}
                            </span>
                            <span
                                className={`text-xs font-medium transition-colors duration-200 ${isActive(path) ? 'text-blue-600 font-bold' : 'text-gray-500 group-hover:text-blue-500'}`}
                            >
                                {labels[key]}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
