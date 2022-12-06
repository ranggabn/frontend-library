import { Image } from "antd";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import LayoutPage from "../../components/layoutPage";
import CountUp from "react-countup";

export default function Tnc() {
  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Syarat & Ketentuan</b>
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <img src="/images/logo.svg" alt="" width={200} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ padding: "20px", marginTop: "30px" }}>
              <Row>
                <Col>
                  <h3>Syarat</h3>
                  <ol>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                  </ol>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <h3>Ketentuan</h3>
                  <ol>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                      orci. Vestibulum ante ipsum primis in faucibus orci luctus
                      et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Etiam facilisis lacus
                      vel egestas tempor. Duis ultricies dictum ex, a aliquam
                      est eleifend a. Cras nec diam dignissim, molestie arcu ut,
                      facilisis neque. Aliquam fringilla purus nec vulputate
                      finibus.
                    </li>
                  </ol>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
Tnc.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
