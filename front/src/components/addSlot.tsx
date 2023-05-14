import React, { FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

//Los minutos en las horas no valen para nada pq el back no los tiene en cuenta
const AddSlot: FC =() => {
    const mutation = gql`
        mutation addSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!){
            addSlot(year: $year, month: $month, day: $day, hour: $hour) {
                year,
                month,
                day,
                hour
            }
        }
    `;
    const [dateTime, setDateTime] = useState('');

    const [addSlot, { data, loading, error }] = useMutation(mutation);

    const handleAddSlot = async () => {
        try {
            const date = new Date(dateTime);
            await addSlot({
                variables: { hour: date.getHours(), day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Añadir cita</h2>
            <div>
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
                <button onClick={handleAddSlot} disabled={loading}>
                    Añadir
                </button>
                {error && (
                    <div>
                        <p>Error al añadir la cita:</p>
                        <p>{error.message}</p>
                    </div>
                )}

                {data && <div>
                    <p>Cita añadida correctamente:</p>
                    <li>Hora: {data.addSlot.hour}</li>
                    <li>Día: {data.addSlot.day}</li>
                    <li>Mes: {data.addSlot.month}</li>
                    <li>Año: {data.addSlot.year}</li>
                </div>
                }
            </div>
        </div>
    );
};

export default AddSlot;