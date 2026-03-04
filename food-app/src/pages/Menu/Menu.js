import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import Cards from "../../components/Layouts/Cards";
import menuItems from "../../data/menuItems";
import "../../styles/MenuStyle.css";
import "../../styles/PagesStyle.css";

const renderRatingIcons = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (rating > 0.5) {
            stars.push(<i key={i} className="bi bi-star-fill"></i>);
            rating--;
        } else if (rating > 0 && rating < 1) {
            stars.push(<i key={"half"} className="bi bi-star-half"></i>);
            rating--;
        } else {
            stars.push(<i key={`empty${i}`} className="bi bi-star"></i>);
        }
    }
    return stars;
};

const Menu = () => {
    const [allItems, setAllItems] = useState(menuItems);
    const [filteredItems, setFilteredItems] = useState(menuItems);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("products")) || [];
        const deleted = JSON.parse(localStorage.getItem("deletedProductIds")) || [];
        const deletedSet = new Set(Array.isArray(deleted) ? deleted : []);
        const merged = [...menuItems, ...stored].filter((p) => !deletedSet.has(p.id));
        setAllItems(merged);
        setFilteredItems(merged);
    }, []);

    const handleFilter = (filter) => {
        if (filter === "all") {
            setFilteredItems(allItems);
        } else if (filter === "popular") {
            setFilteredItems(allItems.filter((item) => item.rating >= 4));
        } else if (filter === "budget") {
            setFilteredItems(allItems.filter((item) => item.price < 80));
        }
        setSearchTerm("");
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === "") {
            setFilteredItems(allItems);
        } else {
            const searched = allItems.filter((item) =>
                item.title.toLowerCase().includes(term)
            );
            setFilteredItems(searched);
        }
    };

    return (
        <Layout>
            <section className="menu_section">
                <Container>
                    <Row>
                        <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
                            <h2>OUR COMPLETE MENU</h2>
                            <input
                                type="text"
                                placeholder="Search by product name..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search_input"
                                style={{
                                    width: "100%",
                                    padding: "10px 15px",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                    fontSize: "16px",
                                    marginTop: "10px"
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-5 justify-content-center">
                        <Col lg="auto" className="mb-3">
                            <button
                                onClick={() => handleFilter("all")}
                                className="filter_btn active"
                            >
                                All Menu
                            </button>
                        </Col>
                        <Col lg="auto" className="mb-3">
                            <button
                                onClick={() => handleFilter("popular")}
                                className="filter_btn"
                            >
                                Popular
                            </button>
                        </Col>
                        <Col lg="auto" className="mb-3">
                            <button
                                onClick={() => handleFilter("budget")}
                                className="filter_btn"
                            >
                                Budget Friendly
                            </button>
                        </Col>
                    </Row>

                    <Row>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <Cards
                                    key={item.id}
                                    id={item.id}
                                    image={item.image}
                                    rating={item.rating}
                                    title={item.title}
                                    paragraph={item.paragraph}
                                    price={item.price}
                                    renderRatingIcons={renderRatingIcons}
                                />
                            ))
                        ) : (
                            <Col lg={12} className="text-center">
                                <h4 style={{ color: "#d32f2f", marginTop: "40px" }}>
                                    No products found
                                </h4>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default Menu;
