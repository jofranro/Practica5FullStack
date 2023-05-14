import AvailableSlots from "@/components/availableSlots"
import BookSlot from "@/components/bookSlot"
import Link from "next/link"
import AvailableSlots2 from "@/components/availableSlots2"
import { useState } from "react";

//Se carga en client side porque se realizan peticiones a la api , realiza todas las solicitudes necesarias para obtener y actualizar el contenido de la página

export default function Paciente() {
    
    const [selectedTab, setSelectedTab] = useState("slots");

    return (
        <>
            <h1>Paciente</h1>
            <h2>Consultar Slot</h2>


            <div className="buttons-container">
                <button onClick={() => setSelectedTab("slots")}>Por día exacto</button>
                <button onClick={() => setSelectedTab("slots2")}>Por mes</button>
            </div>
            {selectedTab === "slots" && <AvailableSlots />}
            {selectedTab === "slots2" && <AvailableSlots2 />}

            <BookSlot />
            <br></br>
            <Link href="/" >Volver</Link>
        </>
    )
}
