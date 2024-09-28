import React, { createRef } from 'react';
import { Dropdown, Grid, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';

class FlightSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.departureAirportRef = createRef();
        this.destinationAirportRef = createRef();
        this.departureDateRef = createRef();
        this.returnDateRef = createRef();
        this.adultsRef = createRef();
        this.childrenRef = createRef();
        this.currencyRef = createRef();
    }

    handleSearchClick = () => {
        this.setState({ loading: true });

        if (!this.departureAirportRef.current.state.value ||
            !this.destinationAirportRef.current.state.value ||
            !this.departureDateRef.current.value) {
            alert('Please enter all required fields. Thanks!');
            return;
        }
        
        const searchParams = {
            originLocationCode: this.departureAirportRef.current.state.value,
            destinationLocationCode: this.destinationAirportRef.current.state.value,
            departureDate: this.departureDateRef.current.value,
            returnDate: this.returnDateRef.current.value,
            adults: parseInt(this.adultsRef.current.value),
            children: parseInt(this.childrenRef.current.value),
            currencyCode: this.currencyRef.current.state.value
        };
        this.props.onSearch(searchParams);
    }

    render() {
        const { airportOptions, currencyOptions } = this.props;

        return (
            <Grid style={{ color: 'white', padding: '0 35px' }}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <label >Departure Airport:
                            <span style={{ fontSize: 30, color: 'red' }}>*</span>
                        </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Dropdown options={airportOptions}
                            ref={this.departureAirportRef}
                            fluid search selection />
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <label>Destination Airport:
                            <span style={{ fontSize: 30, color: 'red' }}>*</span>
                        </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Dropdown options={airportOptions}
                            ref={this.destinationAirportRef} fluid search selection />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        <label> Departure Date:
                            <span style={{ fontSize: 30, color: 'red' }}>*</span>
                        </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <input ref={this.departureDateRef}
                            value={this.props.departureDate}
                            onChange={this.props.handleDepartureDateChange} 
                            type="date" className="form-control"
                        />
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <label>Return Date: </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <input ref={this.returnDateRef} type="date" className="form-control" />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        <label>Adults: </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <input type="number" min="1"
                            ref={this.adultsRef} 
                            value={this.props.adultsValue}
                            onChange={this.props.handleAdultsChange} 
                            className="form-control" />
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <label>Children: </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <input type="number" min="1" ref={this.childrenRef} className="form-control" />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        <label>Currency: </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Dropdown options={currencyOptions}
                            ref={this.currencyRef} fluid search selection />
                    </Grid.Column>

                    <Grid.Column width={3}> </Grid.Column>
                    <Grid.Column width={5}>
                        <Button color="black" size="big" onClick={this.handleSearchClick}>Search</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default FlightSearchForm;