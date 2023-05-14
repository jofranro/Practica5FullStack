import { gql, useMutation } from "@apollo/client";
import { FC, useState } from "react";

const bookSlot: FC = () => {
    const mutation = gql`
    mutation bookSlot($hour: Int!, $day: Int!, $month: Int!, $year: Int!, $dni: String!) {
        bookSlot(hour: $hour, day: $day, month: $month, year: $year, dni: $dni) {
          hour
          day
          month
          year
          dni
        }
      }
    `;
    const [dateTime, setDateTime] = useState('');
    const [dni, setDni] = useState('');
    const [bookSlot, { data, loading, error }] = useMutation(mutation);
    const handleBookSlot = async () => {
        if (!dni) {
            alert('Please enter your DNI');
            return;
        }
        try {
            const date = new Date(dateTime);
            await bookSlot({
                variables: { hour: date.getHours(), day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear(), dni: dni },
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <h2>Reservar Slot</h2>
            <div>
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
                <input
                    type="dni"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}   
                />
                <button onClick={handleBookSlot} disabled={loading}>
                    Reservar
                </button>
                {error && (
                    <div>
                        <p>Error al reservar la cita:</p>
                        <p>{error.message}</p>
                    </div>
                )}
                {data && <div>
                        <p>Cita reservada correctamente:</p>
                        <li>Hora: {data.bookSlot.hour}</li>
                        <li>Día: {data.bookSlot.day}</li>
                        <li>Mes: {data.bookSlot.month}</li>
                        <li>Año: {data.bookSlot.year}</li>
                        <li>DNI: {data.bookSlot.dni}</li>
                    </div>
                }
            </div>
        </div>
    );
};

export default bookSlot;