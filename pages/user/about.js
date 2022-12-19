import { Image } from "antd";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import LayoutPage from "../../components/layoutPage";
import CountUp from "react-countup";
import { unauthPage } from "../../middleware/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}
export default function About() {
  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Tentang Kami</b>
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
                <Col md={6}>
                  <Image
                    src="/images/library.jpeg"
                    alt="library"
                    style={{ minHeight: "450px" }}
                  />
                </Col>
                <Col md={6}>
                  <p style={{ textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                    orci. Vestibulum ante ipsum primis in faucibus orci luctus
                    et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Etiam facilisis lacus vel
                    egestas tempor. Duis ultricies dictum ex, a aliquam est
                    eleifend a. Cras nec diam dignissim, molestie arcu ut,
                    facilisis neque. Aliquam fringilla purus nec vulputate
                    finibus. Mauris laoreet augue vel purus iaculis laoreet vel
                    lobortis lacus. Mauris cursus magna vel nibh dapibus luctus.
                    Ut scelerisque id purus quis pharetra. Praesent eros nisi,
                    consectetur vel varius quis, condimentum in quam. Praesent
                    sed elementum sem. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed facilisis lobortis laoreet. Nulla sem
                    ligula, tempor a gravida nec, tristique ut sem. Sed
                    malesuada, tellus id vestibulum eleifend, felis lectus
                    imperdiet ex, et finibus lorem mi in orci. Etiam cursus
                    luctus purus, sed laoreet massa porta non. Etiam a tortor
                    eros. Nam eu feugiat odio, bibendum sodales libero. Quisque
                    efficitur viverra neque. Donec eleifend, lacus id pharetra
                    semper, orci eros pretium odio, et consequat odio sapien a
                    lectus. Nulla lacus justo, molestie quis lacus id, laoreet
                    imperdiet leo. Integer quam quam, sodales nec nibh vitae,
                    vestibulum lobortis leo. Morbi sit amet mi at mi gravida
                    tincidunt eu quis tellus. Curabitur non pellentesque ligula.
                    Morbi pretium feugiat felis, non elementum magna consectetur
                    elementum. In efficitur facilisis erat suscipit
                    sollicitudin. Vestibulum ante ipsum primis in faucibus orci
                    luctus et ultrices posuere cubilia curae; Curabitur lobortis
                    orci eget nisl condimentum varius. Integer elementum nulla
                    at purus dignissim cursus. Praesent efficitur laoreet
                    turpis, vitae consectetur purus suscipit vel. Duis sit amet
                    malesuada quam, non pharetra est. Quisque pellentesque
                    ligula nec dolor semper viverra. Fusce a metus consequat,
                    iaculis nulla vitae, luctus libero. In iaculis, sapien
                    rhoncus hendrerit tristique, ante tellus fermentum eros, et
                    rhoncus enim augue id arcu.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p style={{ textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                    orci. Vestibulum ante ipsum primis in faucibus orci luctus
                    et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Etiam facilisis lacus vel
                    egestas tempor. Duis ultricies dictum ex, a aliquam est
                    eleifend a. Cras nec diam dignissim, molestie arcu ut,
                    facilisis neque. Aliquam fringilla purus nec vulputate
                    finibus. Mauris laoreet augue vel purus iaculis laoreet vel
                    lobortis lacus. Mauris cursus magna vel nibh dapibus luctus.
                    Ut scelerisque id purus quis pharetra. Praesent eros nisi,
                    consectetur vel varius quis, condimentum in quam. Praesent
                    sed elementum sem. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed facilisis lobortis laoreet. Nulla sem
                    ligula, tempor a gravida nec, tristique ut sem. Sed
                    malesuada, tellus id vestibulum eleifend, felis lectus
                    imperdiet ex, et finibus lorem mi in orci. Etiam cursus
                    luctus purus, sed laoreet massa porta non. Etiam a tortor
                    eros. Nam eu feugiat odio, bibendum sodales libero. Quisque
                    efficitur viverra neque. Donec eleifend, lacus id pharetra
                    semper, orci eros pretium odio, et consequat odio sapien a
                    lectus. Nulla lacus justo, molestie quis lacus id, laoreet
                    imperdiet leo. Integer quam quam, sodales nec nibh vitae,
                    vestibulum lobortis leo. Morbi sit amet mi at mi gravida
                    tincidunt eu quis tellus. Curabitur non pellentesque ligula.
                    Morbi pretium feugiat felis, non elementum magna consectetur
                    elementum. In efficitur facilisis erat suscipit
                    sollicitudin. Vestibulum ante ipsum primis in faucibus orci
                    luctus et ultrices posuere cubilia curae; Curabitur lobortis
                    orci eget nisl condimentum varius. Integer elementum nulla
                    at purus dignissim cursus. Praesent efficitur laoreet
                    turpis, vitae consectetur purus suscipit vel. Duis sit amet
                    malesuada quam, non pharetra est. Quisque pellentesque
                    ligula nec dolor semper viverra. Fusce a metus consequat,
                    iaculis nulla vitae, luctus libero. In iaculis, sapien
                    rhoncus hendrerit tristique, ante tellus fermentum eros, et
                    rhoncus enim augue id arcu.
                  </p>
                </Col>
              </Row>
              <Row className="row-bg-dark mt-4">
                <Col lg={3} md={3} className="col-count">
                  <h2 className="text-center">Jumlah Anggota</h2>
                  <h4>
                    <CountUp end={1573} /> Orang
                  </h4>
                </Col>
                <Col lg={3} md={3} className="col-count">
                  <h2 className="text-center">
                    Jumlah Buku <br />
                  </h2>
                  <h4>
                    <CountUp end={23478} /> Buku
                  </h4>
                </Col>
                <Col lg={3} md={3} className="col-count">
                  <h2 className="text-center">
                    Jumlah Peminjam <br />
                  </h2>
                  <h4>
                    <CountUp end={63242} /> Orang
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p style={{ textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus arcu dui, egestas non elit gravida, luctus lacinia
                    orci. Vestibulum ante ipsum primis in faucibus orci luctus
                    et ultrices posuere cubilia curae; Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Etiam facilisis lacus vel
                    egestas tempor. Duis ultricies dictum ex, a aliquam est
                    eleifend a. Cras nec diam dignissim, molestie arcu ut,
                    facilisis neque. Aliquam fringilla purus nec vulputate
                    finibus. Mauris laoreet augue vel purus iaculis laoreet vel
                    lobortis lacus. Mauris cursus magna vel nibh dapibus luctus.
                    Ut scelerisque id purus quis pharetra. Praesent eros nisi,
                    consectetur vel varius quis, condimentum in quam. Praesent
                    sed elementum sem. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed facilisis lobortis laoreet. Nulla sem
                    ligula, tempor a gravida nec, tristique ut sem. Sed
                    malesuada, tellus id vestibulum eleifend, felis lectus
                    imperdiet ex, et finibus lorem mi in orci. Etiam cursus
                    luctus purus, sed laoreet massa porta non. Etiam a tortor
                    eros. Nam eu feugiat odio, bibendum sodales libero. Quisque
                    efficitur viverra neque. Donec eleifend, lacus id pharetra
                    semper, orci eros pretium odio, et consequat odio sapien a
                    lectus. Nulla lacus justo, molestie quis lacus id, laoreet
                    imperdiet leo. Integer quam quam, sodales nec nibh vitae,
                    vestibulum lobortis leo. Morbi sit amet mi at mi gravida
                    tincidunt eu quis tellus. Curabitur non pellentesque ligula.
                    Morbi pretium feugiat felis, non elementum magna consectetur
                    elementum. In efficitur facilisis erat suscipit
                    sollicitudin. Vestibulum ante ipsum primis in faucibus orci
                    luctus et ultrices posuere cubilia curae; Curabitur lobortis
                    orci eget nisl condimentum varius. Integer elementum nulla
                    at purus dignissim cursus. Praesent efficitur laoreet
                    turpis, vitae consectetur purus suscipit vel. Duis sit amet
                    malesuada quam, non pharetra est. Quisque pellentesque
                    ligula nec dolor semper viverra. Fusce a metus consequat,
                    iaculis nulla vitae, luctus libero. In iaculis, sapien
                    rhoncus hendrerit tristique, ante tellus fermentum eros, et
                    rhoncus enim augue id arcu.
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
About.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
