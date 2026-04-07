import { Container, Table, Card, Row, Col } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";

function DashboardPage(){
    return(
        <>
        <NavbarComponent/>
        <Container>
            <Row>
                <Col md={12}>
                <Card className="shadow-sm border-0 mt-3">
                    <Card.Body>
                        <h3>Data Pengguna</h3>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default DashboardPage;
