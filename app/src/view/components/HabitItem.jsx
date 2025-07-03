export default function HabitItem({ habit }) {
    return (
        <div className="flex items-center justify-between p-2 border rounded">
            <span className="flex items-center">
                <span className="mr-2">{habit.emoji || "📌"}</span>
                {habit.name}
            </span>
            <div className="flex space-x-2">
                <button className="text-green-500 text-xl">✅</button>
                <button className="text-red-500 text-xl">❌</button>
            </div>
        </div>
    );
}
