import { Col, Container, Row } from "react-bootstrap";
import CardComp from "../components/content/cardComp";
import CollapseComp from "../components/content/collapseComp";
import Jumbotron from "../components/content/jumbotron";
import LayoutPage from "../components/layoutPage";
import CountUp from "react-countup";
import { unauthPage } from "../middleware/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}
export default function Home() {
  return (
    <>
      <div>
        <Row>
          <Col>
            <Jumbotron />
          </Col>
        </Row>
        <div className="bg-index">
          <Row>
            <Col className="row-index">
              <img src="/images/logo.svg" alt="" height={100} />
            </Col>
          </Row>
          <CardComp />
          <Row className="row-bg-dark">
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
          <Container>
            <Row>
              <Col className="mb-5">
                <h2 className="ms-5">FAQ</h2>
                <CollapseComp />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
Home.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
