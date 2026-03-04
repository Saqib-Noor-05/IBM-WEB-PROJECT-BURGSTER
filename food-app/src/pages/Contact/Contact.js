import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import "../../styles/PagesStyle.css";

const Contact = () => {
    return (
        <Layout>
            <section className="contact_page pb-5">
                <Container>
                    <Row>
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h2 className="text-center mb-5">Contact Us</h2>

                            <Row className="mb-5">
                                <Col md={4} className="text-center mb-4">
                                    <h5>📍 Location</h5>
                                    <p>123 Burger Street<br />Food City, FC 12345</p>
                                </Col>
                                <Col md={4} className="text-center mb-4">
                                    <h5>📞 Phone</h5>
                                    <p>+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                                </Col>
                                <Col md={4} className="text-center mb-4">
                                    <h5>✉️ Email</h5>
                                    <p>info@tastyburger.com<br />support@tastyburger.com</p>
                                </Col>
                            </Row>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your Name" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Your Email" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Your Message"
                                    />
                                </Form.Group>

                                <Button className="btn btn_red">Send Message</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default Contact;
