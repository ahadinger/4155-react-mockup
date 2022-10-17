import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';


export default class PopUp extends Component {    
    render() {
        return (
        <Card>
            <Card.Body>
                <Card.Title>props.title</Card.Title>
                <Card.Text>
                    props.body
                </Card.Text>
            </Card.Body>
        </Card>
        );
    }
}