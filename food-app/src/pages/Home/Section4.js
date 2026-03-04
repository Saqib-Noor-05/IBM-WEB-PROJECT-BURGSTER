import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../assets/promotion/pro.png";

function Section4() {
  return (
    <>
      <section className="promotion_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img src={PromotionImage} className="img-fluid" alt="Promotion" />
            </Col>
            <Col lg={6} className="px-5">
              <h2>Nothing brings people together like a good burger</h2>
              <p>
                Good food brings people together, creating moments of joy, laughter, and connection. At Tasty Burger, we craft every burger with fresh ingredients and rich flavors so you can enjoy unforgettable meals with the people who matter most. Whether it’s a quick bite or a group hangout, our food makes every gathering special.
              </p>
              <ul>
                <li>
                  <p>
                    Fresh, high-quality ingredients in every bite </p>
                </li>
                <li>
                  <p>Perfect for sharing with friends and family</p>
                </li>
                <li>
                  <p>
                    Crafted to create memorable dining experiences together</p>

                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section >

      <section className="bg_parallax_scroll"></section>
    </>
  );
}

export default Section4;
