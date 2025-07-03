import { useNavigate } from "react-router-dom";
import { Button } from "../library";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="fixed bottom-0 left-0 w-full flex justify-around bg-[#F6F6F6] text-3xl py-2">
            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => navigate("/goals")}> 🎯 </Button>
            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => navigate("/progress")}> 📊 </Button>
            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => navigate("/habits")}> ⭐ </Button>
            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => navigate("/diary")}> 📅 </Button>
            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => navigate("/settings")}> ⚙️ </Button>
        </footer>
    );
}
