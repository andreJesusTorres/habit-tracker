import { useNavigate, useParams } from "react-router-dom";
import addHabit from "../../logic/habits/addHabit";
import { useNotifications } from '../hooks/useNotifications.jsx';
import Header from "./Header";
import capitalize from '../../util/capitalize';

const habitsByCategory = {
    "salud-y-bienestar": [
        { name: "Beber agua", emoji: "💧" },
        { name: "Descansar", emoji: "😴" },
        { name: "Meditar", emoji: "🧘" },
        { name: "Comer saludable", emoji: "🥗" }
    ],
    "actividad-física": [
        { name: "Ir al gimnasio", emoji: "🏋️" },
        { name: "Ir a correr", emoji: "🏃" },
        { name: "Salir a caminar", emoji: "🚶" },
        { name: "Hacer deporte", emoji: "⚽" }
    ],
    "desarrollo-personal": [
        { name: "Leer", emoji: "📖" },
        { name: "Estudiar", emoji: "📚" },
        { name: "Ver contenido productivo", emoji: "📺" },
        { name: "Aprender", emoji: "🎓" }
    ],
    "hábitos-negativos": [
        { name: "No fumar", emoji: "🚭" },
        { name: "No beber", emoji: "🚫" },
        { name: "No procrastinar", emoji: "⏰" },
        { name: "No comer comida basura", emoji: "🍔" }
    ],
    "finanzas": [
        { name: "Ahorrar 10€", emoji: "💰" },
        { name: "Controlar gastos", emoji: "📊" }
    ],
    "sociales": [
        { name: "Llamar a un amigo", emoji: "📞" },
        { name: "Pasar tiempo en familia", emoji: "👨‍👩‍👧‍👦" }
    ]
};

const categoryMap = {
    "salud-y-bienestar": "salud y bienestar",
    "actividad-física": "actividad física",
    "desarrollo-personal": "desarrollo personal",
    "hábitos-negativos": "negativos",
    "finanzas": "finanzas",
    "sociales": "sociales"
};

export default function HabitSelection() { 
    const { category } = useParams();
    const navigate = useNavigate();
    const { alert } = useNotifications();
    const habits = habitsByCategory[category] || [];

    const handleHabitSuccess = () => {
        alert('¡Hábito agregado exitosamente!', 'success');
        // Usar setTimeout para que la notificación se muestre antes de navegar
        setTimeout(() => {
            navigate('/habits');
        }, 1000);
    };
    const habitsHandlers= {
        "desarrollo-personal": [
            ()=>{
                try {
                    return addHabit("leer", categoryMap[category], "text", "\ud83d\udcd6")
                        .then(()=>{
                            handleHabitSuccess();
                        })
                        .catch(error=> {
                            alert(error.message || error, 'error');
                        })
                } catch (error) {
                    alert(error.message, 'error')
                }},
            ()=>{
                try {
                    return addHabit("estudiar", categoryMap[category], "text", "\ud83d\udcda")
                        .then(()=>{
                            handleHabitSuccess();
                        })
                        .catch(error=> {
                            alert(error.message || error, 'error');
                        })
                } catch (error) {
                    alert(error.message, 'error')
                }},
            ()=>{
                try {
                    return addHabit("ver contenido productivo", categoryMap[category], "text", "\ud83d\udcfa")
                        .then(()=>{
                            handleHabitSuccess();
                        })
                        .catch(error=> {
                            alert(error.message || error, 'error');
                        })
                } catch (error) {
                    alert(error.message, 'error')
                }},
            ()=>{
                try {
                    return addHabit("aprender", categoryMap[category], "text", "\ud83c\udf93")
                        .then(()=>{
                            handleHabitSuccess();
                        })
                        .catch(error=> {
                            alert(error.message || error, 'error');
                        })
                } catch (error) {
                    alert(error.message, 'error')
                }},
        ],
        "salud-y-bienestar": [
            ()=>{ 
                return addHabit("beber agua", categoryMap[category], "text", "\ud83d\udca7")
                    .then(()=>{
                        handleHabitSuccess();
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito', 'error');
                    });
            },
            ()=>{ 
                return addHabit("descansar", categoryMap[category], "text", "\ud83d\ude34")
                    .then(()=>{
                        handleHabitSuccess();
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito', 'error');
                    });
            },
            ()=>{ 
                return addHabit("meditar", categoryMap[category], "text", "\ud83e\uddd8")
                    .then(()=>{
                        handleHabitSuccess();
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito', 'error');
                    });
            },
            ()=>{ 
                return addHabit("comer saludable", categoryMap[category], "text", "\ud83e\udd57")
                    .then(()=>{
                        handleHabitSuccess();
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito', 'error');
                    });
            },
        ],
        "actividad-física": [
            ()=>{ return addHabit("ir al gimnasio", categoryMap[category], "text", "\ud83c\udfcb\ufe0f").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("ir a correr", categoryMap[category], "text", "\ud83c\udfc3").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("salir a caminar", categoryMap[category], "text", "\ud83d\udeb6").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("hacer deporte", categoryMap[category], "text", "\u26bd").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
        ],
        "hábitos-negativos": [
            ()=>{ return addHabit("no fumar", categoryMap[category], "text", "\ud83d\udead").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("no beber", categoryMap[category], "text", "\ud83d\udeab").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("no procrastinar", categoryMap[category], "text", "\u23f0").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("no comer comida basura", categoryMap[category], "text", "\ud83c\udf54").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
        ],
        "finanzas": [
            ()=>{ return addHabit("ahorrar 10€", categoryMap[category], "text", "\ud83d\udcb0").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("controlar gastos", categoryMap[category], "text", "\ud83d\udcca").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
        ],
        "sociales": [
            ()=>{ return addHabit("llamar a un amigo", categoryMap[category], "text", "\ud83d\udcde").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
            ()=>{ return addHabit("pasar tiempo en familia", categoryMap[category], "text", "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66").then(()=>{handleHabitSuccess()}).catch(error=> alert(error.message || error, 'error')) },
        ],
    }
    const handleClick = (index)=>{
        if (habitsHandlers[category] && habitsHandlers[category][index]) {
            habitsHandlers[category][index]()
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header title={category.split("-").join(" ")} ArrowBack onBack={() => navigate('/habits/category')} />
            <div className="p-4 max-w-lg mx-auto">
                <ul className="space-y-4 mt-6">
                    {habits.map((habit, index) => (
                        <li key={habit.name} className="bg-white rounded-lg shadow-sm border-2 p-4 hover:shadow-md transition-all">
                            <button 
                                onClick={()=> handleClick(index)}
                                className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-gray-50 focus:outline-none"
                            >
                                <span className="text-2xl">{habit.emoji}</span>
                                <span className="text-lg font-semibold text-gray-800">{capitalize(habit.name)}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
