import { useNavigate, useParams } from "react-router-dom";
import addHabit from "../../logic/habits/addHabit";

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



export default function HabitSelection() { 
    const { category } = useParams();
    const navigate = useNavigate()
    const habits = habitsByCategory[category] || [];
    const habitsHandlers= {
        "desarrollo-personal": [
            ()=>{
                try {
                    return addHabit("leer un libro", category.split("-").join(" "), "text", "📖").then(()=>{navigate("/habits")}).catch(error=> alert(error))
                } catch (error) {
                    alert(error.message)
                }},
            ()=>{
                try {
                    return addHabit("aprender algo nuevo", category.split("-").join(" "), "text", "🎓").then(()=>{navigate("/habits")}).catch(error=> alert(error))
                } catch (error) {
                    alert(error.message)
                }},
        ],
        "salud-y-bienestar": [
            ()=>{ try { return addHabit("higiene personal", category.split("-").join(" "), "text", "🛁").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("comer saludable", category.split("-").join(" "), "text", "🥗").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("dormir bien", category.split("-").join(" "), "text", "😴").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("meditación", category.split("-").join(" "), "text", "🧘").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("beber agua", category.split("-").join(" "), "text", "💧").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("cuidado corporal", category.split("-").join(" "), "text", "💆").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
        ],
        "actividad-física": [
            ()=>{ try { return addHabit("entrenamiento diario", category.split("-").join(" "), "text", "🏋️").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("caminar 10,000 pasos", category.split("-").join(" "), "text", "🚶").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("ejercicio de flexibilidad", category.split("-").join(" "), "text", "🧘‍♀️").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
        ],
        "hábitos-negativos": [
            ()=>{ try { return addHabit("reducir tiempo en redes", category.split("-").join(" "), "text", "📱").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("no beber alcohol", category.split("-").join(" "), "text", "🚫").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
        ],
        "finanzas": [
            ()=>{ try { return addHabit("ahorrar 10€", category.split("-").join(" "), "text", "💰").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("controlar gastos", category.split("-").join(" "), "text", "📊").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
        ],
        "sociales": [
            ()=>{ try { return addHabit("llamar a un amigo", category.split("-").join(" "), "text", "📞").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
            ()=>{ try { return addHabit("pasar tiempo en familia", category.split("-").join(" "), "text", "👨‍👩‍👧‍👦").then(()=>{navigate("/habits")}).catch(error=> alert(error)) } catch (error) { alert(error.message) }},
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
