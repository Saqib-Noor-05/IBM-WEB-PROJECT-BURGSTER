import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "@sweetalert2/theme-material-ui/material-ui.css";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cards({ id, image, rating, title, paragraph, price, renderRatingIcons }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ id, title, price, image });
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${title} added to cart!`,
      theme: "material-ui",
    });

  };

  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          {typeof image === "string" ? (
            <Card.Img variant="top" src={image} />
          ) : (
            image
          )}
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item_rating">{renderRatingIcons(rating)}</div>
            <div className="wishlist">
            </div>
          </div>

          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>

          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">₹{price}</h5>
            </div>
            <div className="add_to_card">
              <button
                onClick={handleAddToCart}
                style={{
                  background: "#fde4e4",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#212245",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#fcc7ca";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#fde4e4";
                  e.target.style.transform = "scale(1)";
                }}
              >
                <i className="bi bi-bag me-2"></i>
                Add To Cart
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;
