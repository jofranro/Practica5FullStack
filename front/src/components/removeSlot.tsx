import React, { FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const RemoveSlot: FC = () => {
    const mutation= gql`
    mutation removeSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!){
        removeSlot(year: $year, month: $month, day: $day, hour: $hour) {
          year,
          month,
          day,
          hour,
        }
      }
    `;
    
    const [dateTime, setDateTime] = useState('');

    const [removeSlot, { data, loading, error }] = useMutation(mutation);

    const handleRemoveSlot = async () => {
    try {
        const date = new Date(dateTime);
        await removeSlot({
            variables: { hour: date.getHours(), day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() },
        });
    } catch (err) {
        console.log(err);
    }
    };

    return (
    <div>
        <h2>Eliminar horario disponible</h2>
        <div>
            <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
            />
            <button onClick={handleRemoveSlot} disabled={loading}>
                Eliminar
            </button>
            {error && (
                <div>
                    <p>Error al eliminar la cita:</p>
                    <p>{error.message}</p>
                </div>
            )}
             {data && <div>
                    <p>Cita eliminada correctamente:</p>
                    <li>Hora: {data.removeSlot.hour}</li>
                    <li>Día: {data.removeSlot.day}</li>
                    <li>Mes: {data.removeSlot.month}</li>
                    <li>Año: {data.removeSlot.year}</li>
                </div>
                }
        </div>
    </div>
    );
};

export default RemoveSlot;