import React, { Component } from 'react';
import { Badge, Row, Col } from 'reactstrap';
import ChainStatus from './ChainStatusContainer.js';
import TopValidators from './TopValidatorsContainer.js';
import BlocksTable from '../blocks/BlocksTable.jsx';

import { Helmet } from "react-helmet";

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <div id="home">
            <Helmet>
                <title>Barkis Blockchain Explorer</title>
                <meta name="description" content="Barkisnet is a decentralized network of independent parallel blockchains, each powered by BFT consensus algorithms like Tendermint consensus." />
            </Helmet>
            <Row>
                <Col md={3} xs={12}><h1>{Meteor.settings.public.chainName}</h1></Col>
                {/*<Col md={9} xs={12} className="text-md-right"><ChainStates /></Col>*/}
            </Row>
            {/*<Consensus />*/}
            <Row>
                <Col md={6}>
                    <ChainStatus />
                    <TopValidators />
                </Col>
                <Col md={6}>
                    <BlocksTable />
                </Col>
            </Row>
        </div>
    }

}
