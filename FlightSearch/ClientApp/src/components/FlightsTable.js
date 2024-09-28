import React from 'react';

const FlightsTable = ({ flights }) => {
    const formatDateTime = (dateTime) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleString('hr-HR', options);
    };

    return (
        <table style={{ color: 'white', fontWeight: 'bold' }} className='table' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Departure Airport</th>
                    <th>Destination Airport</th>
                    <th>Departure Date</th>
                    <th>Return Date</th>
                    <th>Number of Stops (Outbound)</th>
                    <th>Number of Stops (Inbound)</th>
                    <th>Number of Passengers</th>
                    <th>Currency</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {flights.map((f, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{f.itineraries[0].segments[0].departure.iataCode}</td>
                        <td>{f.itineraries[0].segments[f.itineraries[0].segments.length - 1].arrival.iataCode}</td>
                        <td>{formatDateTime(f.itineraries[0].segments[0].departure.at)}</td>
                        <td>{f.itineraries.length > 1 ? formatDateTime(f.itineraries[1].segments[0].departure.at) : 'N/A'}</td>
                        <td>{f.itineraries[0].segments.length - 1}</td>
                        <td>{f.itineraries.length > 1 ? f.itineraries[1].segments.length - 1 : 'N/A'}</td>
                        <td>{f.travelerPricings.length}</td>
                        <td>{f.price.currency}</td>
                        <td>{f.price.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FlightsTable;
