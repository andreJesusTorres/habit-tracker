import { useNavigate, useParams } from "react-router-dom";
import addHabit from "../../logic/habits/addHabit";
import useContext from '../useContext';
import Header from "./Header";
import capitalize from '../../util/capitalize';

const habitsByCategory = {
    "salud-y-bienestar": [
        { name: "Higiene personal", emoji: "🛁" },
        { name: "Comer saludable", emoji: "🥗" },
        { name: "Dormir bien", emoji: "😴" },
        { name: "Meditación", emoji: "🧘" },
        { name: "Beber agua", emoji: "💧" },
        { name: "Cuidado corporal", emoji: "💆" }
    ],
    "actividad-física": [
        { name: "Entrenamiento diario", emoji: "🏋️" },
        { name: "Caminar 10,000 pasos", emoji: "🚶" },
        { name: "Ejercicio de flexibilidad", emoji: "🧘‍♀️" }
    ],
    "desarrollo-personal": [
        { name: "Leer un libro", emoji: "📖" },
        { name: "Aprender algo nuevo", emoji: "🎓" }
    ],
    "hábitos-negativos": [
        { name: "Reducir tiempo en redes", emoji: "📱" },
        { name: "No beber alcohol", emoji: "🚫" }
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
    const { alert } = useContext();
    const habits = habitsByCategory[category] || [];
    const habitsHandlers= {
        "desarrollo-personal": [
            ()=>{
                try {
                    return addHabit("leer un libro", categoryMap[category], "text", "\ud83d\udcd6")
                        .then(()=>{
                            alert('¡Hábito agregado exitosamente!');
                            window.location.href = "/habits";
                        })
                        .catch(error=> {
                            alert(error.message || error);
                        })
                } catch (error) {
                    alert(error.message)
                }},
            ()=>{
                try {
                    return addHabit("aprender algo nuevo", categoryMap[category], "text", "\ud83c\udf93")
                        .then(()=>{
                            alert('¡Hábito agregado exitosamente!');
                            window.location.href = "/habits";
                        })
                        .catch(error=> {
                            alert(error.message || error);
                        })
                } catch (error) {
                    alert(error.message)
                }},
        ],
        "salud-y-bienestar": [
            ()=>{ 
                return addHabit("higiene personal", categoryMap[category], "text", "\ud83d\udec1")
                    .then(()=>{
                        alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("comer saludable", categoryMap[category], "text", "\ud83e\udd57")
                    .then(()=>{
                        alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("dormir bien", categoryMap[category], "text", "\ud83d\ude34")
                    .then(()=>{
                        alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("meditación", categoryMap[category], "text", "\ud83e\uddd8")
                    .then(()=>{
                        alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("beber agua", categoryMap[category], "text", "\ud83d\udca7")
                    .then(()=>{
                        alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("cuidado corporal", categoryMap[category], "text", "\ud83d\udc86")
                    .then(()=>{
                        alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        alert(error.message || 'Error al agregar hábito');
                    });
            },
        ],
        "actividad-física": [
            ()=>{ return addHabit("entrenamiento diario", categoryMap[category], "text", "\ud83c\udfcb\ufe0f").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
            ()=>{ return addHabit("caminar 10,000 pasos", categoryMap[category], "text", "\ud83d\udeb6").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
            ()=>{ return addHabit("ejercicio de flexibilidad", categoryMap[category], "text", "\ud83e\uddd8\u200d\u2640\ufe0f").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
        ],
        "hábitos-negativos": [
            ()=>{ return addHabit("reducir tiempo en redes", categoryMap[category], "text", "\ud83d\udcf1").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
            ()=>{ return addHabit("no beber alcohol", categoryMap[category], "text", "\ud83d\udeab").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
        ],
        "finanzas": [
            ()=>{ return addHabit("ahorrar 10€", categoryMap[category], "text", "\ud83d\udcb0").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
            ()=>{ return addHabit("controlar gastos", categoryMap[category], "text", "\ud83d\udcca").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
        ],
        "sociales": [
            ()=>{ return addHabit("llamar a un amigo", categoryMap[category], "text", "\ud83d\udcde").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
            ()=>{ return addHabit("pasar tiempo en familia", categoryMap[category], "text", "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66").then(()=>{alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> alert(error.message || error)) },
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
