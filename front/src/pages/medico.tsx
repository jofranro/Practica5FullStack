import AddSlot from "@/components/addSlot"
import RemoveSlot from "@/components/removeSlot"
import Link from "next/link"

//Se carga en client side porque se realizan peticiones a la api , realiza todas las solicitudes necesarias para obtener y actualizar el contenido de la página
export default function Medico() {
    return (
        <>
            <h1>Medico</h1>
            <AddSlot />
            <RemoveSlot />
            <br></br>
            <Link href="/" >Volver</Link>
        </>
    )
}

