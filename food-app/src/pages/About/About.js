import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import "../../styles/PagesStyle.css";

const About = () => {
    return (
        <Layout>
            <section className="about_page pb-5">
                <Container>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }}>
                            <h2 className="mb-4">About Tasty Burger</h2>
                            <p className="mb-3">
                                Welcome to Tasty Burger, your ultimate destination for authentic, delicious burgers made with the finest ingredients and served with passion. Since our establishment, we've been committed to delivering exceptional quality and taste to every customer.
                            </p>
                            <p className="mb-3">
                                Our mission is simple: to provide the best burger experience with fresh ingredients, quick service, and a welcoming atmosphere. We believe that every bite should be memorable.
                            </p>

                            <h4 className="mt-4 mb-3">Why Choose Us?</h4>
                            <ul className="about_list">
                                <li>🍔 Premium quality beef and fresh ingredients</li>
                                <li>⚡ Fast and efficient service</li>
                                <li>💯 100% customer satisfaction guarantee</li>
                                <li>📍 Multiple locations across the city</li>
                                <li>🚚 Quick delivery service available</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default About;
