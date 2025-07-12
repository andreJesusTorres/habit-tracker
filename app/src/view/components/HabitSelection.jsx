import { useNavigate, useParams } from "react-router-dom";
import addHabit from "../../logic/habits/addHabit";
import useContext from '../useContext';

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
    const navigate = useNavigate()
    const { alert } = useContext();
    const habits = habitsByCategory[category] || [];
    const habitsHandlers= {
        "desarrollo-personal": [
            ()=>{
                try {
                    return addHabit("leer un libro", categoryMap[category], "text", "\ud83d\udcd6")
                        .then(()=>{
                            window.alert('¡Hábito agregado exitosamente!');
                            window.location.href = "/habits";
                        })
                        .catch(error=> window.alert(error.message || error))
                } catch (error) {
                    window.alert(error.message)
                }},
            ()=>{
                try {
                    return addHabit("aprender algo nuevo", categoryMap[category], "text", "\ud83c\udf93")
                        .then(()=>{
                            window.alert('¡Hábito agregado exitosamente!');
                            window.location.href = "/habits";
                        })
                        .catch(error=> window.alert(error.message || error))
                } catch (error) {
                    window.alert(error.message)
                }},
        ],
        "salud-y-bienestar": [
            ()=>{ 
                return addHabit("higiene personal", categoryMap[category], "text", "\ud83d\udec1")
                    .then(()=>{
                        window.alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        window.alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("comer saludable", categoryMap[category], "text", "\ud83e\udd57")
                    .then(()=>{
                        window.alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        window.alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("dormir bien", categoryMap[category], "text", "\ud83d\ude34")
                    .then(()=>{
                        window.alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        window.alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("meditación", categoryMap[category], "text", "\ud83e\uddd8")
                    .then(()=>{
                        window.alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        window.alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("beber agua", categoryMap[category], "text", "\ud83d\udca7")
                    .then(()=>{
                        window.alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        window.alert(error.message || 'Error al agregar hábito');
                    });
            },
            ()=>{ 
                return addHabit("cuidado corporal", categoryMap[category], "text", "\ud83d\udc86")
                    .then(()=>{
                        window.alert('¡Hábito agregado exitosamente!');
                        window.location.href = "/habits";
                    })
                    .catch(error=> {
                        window.alert(error.message || 'Error al agregar hábito');
                    });
            },
        ],
        "actividad-física": [
            ()=>{ return addHabit("entrenamiento diario", categoryMap[category], "text", "\ud83c\udfcb\ufe0f").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
            ()=>{ return addHabit("caminar 10,000 pasos", categoryMap[category], "text", "\ud83d\udeb6").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
            ()=>{ return addHabit("ejercicio de flexibilidad", categoryMap[category], "text", "\ud83e\uddd8\u200d\u2640\ufe0f").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
        ],
        "hábitos-negativos": [
            ()=>{ return addHabit("reducir tiempo en redes", categoryMap[category], "text", "\ud83d\udcf1").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
            ()=>{ return addHabit("no beber alcohol", categoryMap[category], "text", "\ud83d\udeab").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
        ],
        "finanzas": [
            ()=>{ return addHabit("ahorrar 10€", categoryMap[category], "text", "\ud83d\udcb0").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
            ()=>{ return addHabit("controlar gastos", categoryMap[category], "text", "\ud83d\udcca").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
        ],
        "sociales": [
            ()=>{ return addHabit("llamar a un amigo", categoryMap[category], "text", "\ud83d\udcde").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
            ()=>{ return addHabit("pasar tiempo en familia", categoryMap[category], "text", "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66").then(()=>{window.alert('¡Hábito agregado exitosamente!');window.location.href = "/habits"}).catch(error=> window.alert(error.message || error)) },
        ],
    }
    const handleClick = (index)=>{
        if (habitsHandlers[category] && habitsHandlers[category][index]) {
            habitsHandlers[category][index]()
        }
    }
    return (
        <main className="p-4">
            <h1 className="text-center text-2xl font-bold capitalize">{category.split("-").join(" ")}</h1>
            <ul className="mt-4 space-y-2">
                {habits.map((habit, index) => (
                    <li key={habit.name} className="p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                        <button 
                            onClick={()=> handleClick(index)}
                            className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                        >
                            <span className="text-2xl">{habit.emoji}</span>
                            <span className="text-lg">{habit.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}
