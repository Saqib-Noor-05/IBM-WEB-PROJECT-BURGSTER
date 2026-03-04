import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import "../../styles/PagesStyle.css";

const Shop = () => {
    return (
        <Layout>
            <section className="shop_page pb-5">
                <Container>
                    <Row>
                        <Col lg={12} className="text-center mb-5">
                            <h2>Shop & Merchandise</h2>
                            <p>Coming Soon! Explore our exclusive merchandise and branded items.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default Shop;
