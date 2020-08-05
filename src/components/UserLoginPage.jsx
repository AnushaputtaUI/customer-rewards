import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { users } from '../dummyData.js'


export default (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    function login(e) {
        if (users.includes(username)) {
            setError('');
            props.history.push({
                pathname: '/rewards',
                state: { user: username }
            });
        }
        else {
            setError('Invalid user')
        }
    }
    return (
        <Container fluid style={{ display: 'flex', height: '100%' }}>
            <Row className="justify-content-md-center align-self-center">
                <Col xs lg="4">
                    <h4 className="header">Login</h4>
                    <div style={{ margin: '1em' }}><input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" /></div>
                    <div style={{ margin: '1em' }}><input type="password" className="form-control" {...password} placeholder="Password" /></div>
                    <Button onClick={(e) => login(e)}>Login</Button>
                    {error !== '' &&
                        <div style={{ color: 'red' }}>{error}</div>}
                </Col>
            </Row>
        </Container>
    )
}