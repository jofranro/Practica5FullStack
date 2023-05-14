import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const availableSlots1: FC = () => {
    const query = gql`
    query AvailableSlots($year: Int!, $month: Int!) {
        availableSlots(year: $year, month: $month) {
          available
          month
          year
          day
          hour
        }
      }
  `;
  
    const [dateTime, setDateTime] = useState<string>('2023-05-14T00:00')
    useEffect(() => {
        const date = new Date(dateTime);
        refetch({ year: date.getFullYear(), month: date.getMonth() + 1 });
    }, [dateTime]);

    const { loading, error, data, refetch } = useQuery<{
        availableSlots: {
            available: boolean;
            hour: number;
            day: number;
            month: number;
            year: number;
        }[];
    }>(query);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return (
        <div className="error">
            Error: {error.message}
        </div>
    );

    const slots = data?.availableSlots || [];

    return (
        <>
            <div>
                <div>
                    <input
                        type="month"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                    <button disabled={loading} onClick={() => refetch()}>
                        Recargar
                    </button>

                    {data?.availableSlots.length === 0 && <div>No hay citas disponibles</div>}
                    {slots.length > 0 && (
                        <div>
                            <p>Citas disponibles:</p>
                            {slots.map((slot, index) => (
                                <div key={index}>
                                    <li>{slot.year}/{slot.month}/{slot.day}        {slot.hour}:00</li>
                                    <br />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default availableSlots1;