import React, { Component } from 'react';
import { Table, Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ValidatorRow = (props) => {
    let moniker = (props.validator.description.moniker)?props.validator.description.moniker:props.validator.address;
    return <tr>
        <th scope="row" className="d-none d-md-table-cell counter">{props.index+1}</th>
        <td><Link to={"/validator/"+props.validator.address}>{moniker} {props.validator.description.identity? <i className="fas fa-check-circle text-success" title={props.validator.description.identity}></i>:''}</Link></td>
        <td>{props.validator.address}</td>
        <td>{numeral(props.validator.firstSeen().height).format('0,0')}</td>
    </tr>
}

export default class FirstSeenList extends Component{
    constructor(props){
        super(props);
        this.state = {
            validators: ""
        }
    }

    componentDidUpdate(prevState){
        if (this.props.validators != prevState.validators){
            if (this.props.validators.length > 0){
                this.setState({
                    validators: this.props.validators.map((validator, i) => {
                        return <ValidatorRow key={i} index={i} validator={validator} />
                    })
                })    
            }
        }
    }

    render(){
        if (this.props.loading){
            return <div>Loading</div>
        }
        else{
            return (
                <Table striped className="validator-list-first-seen">
                    <thead>
                        <tr>
                            <th className="d-none d-md-table-cell counter">&nbsp;</th>
                            <th className="moniker"><i className="material-icons">perm_contact_calendar</i> <span className="d-none d-sm-inline">Moniker</span></th>
                            <th className="address"><i class="material-icons">my_location</i> <span className="d-none d-sm-inline">Address</span></th>
                            <th className="first-seen"><i className="material-icons">access_time</i> <span className="d-none d-sm-inline">First Seen</span></th>
                        </tr>
                    </thead>
                    <tbody>{this.state.validators}</tbody>
                </Table>
            )    
        }
    }
}