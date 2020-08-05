import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { transactions } from '../dummyData.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import rewards from '../rewards.png';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];

export default (props) => {
    const [transactionData, setTransactionData] = useState([]);
    const [totalRewards, setTotalRewards] = useState(0);
    const [monthlyTransactions, setMonthlyTransactions] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('May');
    const [tableData, setTableData] = useState([]);
    const [monthlyRewards, setMonthlyRewards] = useState(0);
    useEffect(() => {
        if (props.location.state.user != undefined) {
            //checks the transactions array for the user passed from login page
            const getUserTransactions = transactions.filter(user => user.username === props.location.state.user);
            setTransactionData([getUserTransactions.transactions])
            getData(getUserTransactions);
            calculateTotalRewards(getUserTransactions);
        }
    }, [props])

    function getData(trans) {
        // groups data by month
        const groupTransactionsByMonth = trans[0].transactions.reduce((acc, obj) => {
            let month = obj.date.split(('/'))[0];
            (acc[months[month - 1]]) ? acc[months[month - 1]].data.push(obj) : acc[months[month - 1]] = { data: [obj] };
            return acc;
        }, {});

        setMonthlyTransactions(groupTransactionsByMonth);
    }
    useEffect(() => {
        //sets table data and monthly rewards
        if (monthlyTransactions[selectedMonth] !== undefined) {
            setTableData(monthlyTransactions[selectedMonth].data)
            setMonthlyRewards(calculate(monthlyTransactions[selectedMonth].data));
        } else {
            setTableData([]);
            setMonthlyRewards(0);
        }
    }, [monthlyTransactions, selectedMonth])

    function calculateTotalRewards(data) {
        //calculates total rewards

        const getRewards = calculate(data[0].transactions)
        setTotalRewards(getRewards);
    }

    function calculate(data) {
        //calculates rewards 
        let rewards = 0;
        data.forEach(trans => {
            if (trans.amount < 50) {
                return;
            } else if (trans.amount > 50 && trans.amount <= 100) {
                const remaining = trans.amount - 50;
                rewards = rewards + 1 * remaining;
            }
            else if (trans.amount > 100) {
                const greatherThanHun = trans.amount - 100
                rewards = rewards + 2 * greatherThanHun + 1 * 50;
            }
        })
        return rewards;
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Rewards</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <span>{props.location.state.user}</span>
                    </Navbar.Text>
                    <Navbar.Text>
                        <a href="/login" style={{ marginLeft: '0.5em' }}>Logout</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <Container className="p-4">
                <Row>
                    <Col md lg="4">
                        <Card>
                            <Card.Img variant="top" src={rewards} />
                            <Card.Body>
                                <Card.Title>Total Rewards</Card.Title>
                                <Card.Text>
                                    {totalRewards}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>

                            <Card.Title style={{ paddingTop: '1em' }}>Monthly Rewards: {monthlyRewards}</Card.Title>
                            <Card.Body>
                                <div style={{ textAlign: 'right' }}><DropDownList data={months} defaultValue="May" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} /></div>
                                <Grid
                                    style={{ marginTop: '1em' }}
                                    data={tableData !== undefined ? tableData : []}
                                >
                                    <Column field="date" title="Date" />
                                    <Column field="amount" title="Transaction Amount" />

                                </Grid>
                            </Card.Body>

                        </Card>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}