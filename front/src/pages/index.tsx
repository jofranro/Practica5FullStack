import Link from "next/link";


export default function Home() {
  return (
    <>
      <h1>Practica 5 Full Stack</h1>
      <ul>
        <li>Jose Francisco Romero Rodríguez</li>
      </ul>

      <h2>Enlaces:</h2>
      <br />
      <Link href="/medico" >Medico</Link>
      <br />
      <Link href="/paciente">Paciente</Link>
    </>  
  )
}

