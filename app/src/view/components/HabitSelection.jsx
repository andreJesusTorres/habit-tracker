import { useNavigate, useParams } from "react-router-dom";
import addHabit from "../../logic/habits/addHabit";

const habitsByCategory = {
    "salud-y-bienestar": ["Higiene personal", "Comer saludable", "Dormir bien", "Meditación", "Beber agua", "Cuidado corporal"],
    "actividad-física": ["Entrenamiento diario", "Caminar 10,000 pasos", "Ejercicio de flexibilidad"],
    "desarrollo-personal": ["Leer un libro", "Aprender algo nuevo"],
    "hábitos-negativos": ["Reducir tiempo en redes", "No beber alcohol"],
    "finanzas": ["Ahorrar 10€", "Controlar gastos"],
    "sociales": ["Llamar a un amigo", "Pasar tiempo en familia"]
};



export default function HabitSelection() { 
    const { category } = useParams();
    const navigate = useNavigate()
    const habits = habitsByCategory[category] || [];
    const habitsHandlers= {
        "desarrollo-personal": [
            ()=>{
                try {
                    return addHabit("leer un libro", category.split("-").join(" "), "text", "📕").then(()=>{navigate("/habits")}).catch(error=> alert(error))
                } catch (error) {
                    alert(error.message)
                }},
            ()=>{
                console.log("clickaprender")}],
    }
    const handleClick = (index)=>{
        habitsHandlers[category][index]()
    }
    return (
        <main className="p-4">
            <h1 className="text-center text-2xl font-bold capitalize">{category.split("-").join(" ")}</h1>
            <ul className="mt-4">
                {habits.map((habit, index) => (
                    <li key={habit} className="p-2 border rounded">
                        <button onClick={()=> handleClick(index)}>{habit}</button>
                    </li>
                ))}
            </ul>
        </main>
    );
}
