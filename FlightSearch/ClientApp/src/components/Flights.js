import React, { Component } from 'react';
import FlightSearchForm from './FlightSearchForm';
import FlightsTable from './FlightsTable';
import 'react-datepicker/dist/react-datepicker.css';
import backgroundImage from '../images/B21.jpg';

export class Flights extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        this.state = {
            departureDate: formattedDate,
            adults: 1,
            flights: [],
            loading: false,
            airports: [],
            currencies: []
        };
    }

    loadCurrencies = async () => {
        const response = await fetch('/Currency.json');
        const data = await response.json();
        data.sort((a, b) => a.code.localeCompare(b.code));
        this.setState({ currencies: data });
    }

    loadAirports = async () => {
        const response = await fetch('/IATAAirport.json');
        const data = await response.json();
        data.sort((a, b) => a.iata.localeCompare(b.iata));
        this.setState({ airports: data });
    }

    componentDidMount() {
        this.loadCurrencies();
        this.loadAirports();
    }

    handleSearch = async (searchParams) => {
        this.setState({ loading: true });
        const response = await fetch('/SearchLowCostFlights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchParams)
        });
        const data = await response.json();
        this.setState({ flights: data, loading: false });
    }

    render() {
        const { airports, currencies, flights, loading } = this.state;

        const airportOptions = airports.map((airport, index) => ({
            key: `${airport.iata}-${index}`,
            value: airport.iata,
            text: `${airport.iata} - ${airport.name}`
        }));

        const currencyOptions = currencies.map(currency => ({
            key: currency.code,
            value: currency.code,
            text: `${currency.code} - ${currency.name}`
        }));

        this.handleDepartureDateChange = (event) => {
            this.setState({ departureDate: event.target.value });
        };

        this.handleAdultsChange = (event) => {
            this.setState({ adults: event.target.value });
        };

        return (
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100%' }}>
                <FlightSearchForm
                    airportOptions={airportOptions}
                    currencyOptions={currencyOptions}
                    adultsValue={this.state.adults}                    
                    handleAdultsChange={this.handleAdultsChange}
                    departureDate={this.state.departureDate}
                    handleDepartureDateChange={this.handleDepartureDateChange}
                    onSearch={this.handleSearch} />
                {loading ? <h1><em>Loading...</em></h1> : <FlightsTable flights={flights} />}
            </div>
        );
    }
}
