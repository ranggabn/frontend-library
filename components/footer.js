import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

export default function FooterComp() {
  return (
    <FooterContainer className="main-footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3 text-center">
                Perpustakaan Kampus Bhataraja
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2 mt-2 text-center">
                  {/* <img src={logo} alt="logo-footer" className="logo-footer" /> */}
                </li>
                <li className="text-justify mb-2">
                  <i className="fa fa-map-marker me-2"></i>
                  Jl Bintara IX, Bekasi, Jawa Barat 60178
                </li>
                <li className="mb-2">
                  <i className="fa fa-whatsapp me-2"></i>
                  Whatsapp. (0813) 11134200
                </li>
                <li className="mb-2">
                  <i className="fa fa-phone me-2"></i>
                  Telp. (0813) 11134200
                </li>
                <li className="mb-2">
                  <i className="fa fa-envelope me-2"></i>
                  tamconsultl@gmail.com
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Layanan Kami</h4>
              <ul className="ml-4">
                <li className="mb-1">
                  <a href="/">Registrasi Anggota Baru</a>
                </li>
                <li className="mb-1">
                  <a href="/">Pinjaman Buku Offline</a>
                </li>
                <li className="mb-1">
                  <a href="/">Pinjaman Buku Online</a>
                </li>
                <li className="mb-1">
                  <a href="/">Fotocopy</a>
                </li>
                <li className="mb-1">
                  <a href="/">Panduan Skripsi & Thesis</a>
                </li>
                <li className="mb-1">
                  <a href="/">Ruang Baca</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Tentang Kami</h4>
              <ul className="ml-4">
                <li className="mb-2">
                  <a href="/">Sejarah</a>
                </li>
                <li className="mb-2">
                  <a href="/">Visi & Misi</a>
                </li>
                <li className="mb-2">
                  <a href="/">Motto</a>
                </li>
                <li className="mb-2">
                  <a href="/">Pengurus Perpustakaan</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Sosial Media</h4>
              <Row>
                <Col lg={2} md={3} sm={2} xs={2}>
                  <a href="">
                    <img
                      src="/images/instagram.png"
                      alt="instagram"
                      className="sosmed-footer"
                    />
                  </a>
                </Col>
                <Col lg={2} md={3} sm={2} xs={2}>
                  <a href="">
                    <img
                      src="/images/whatsapp.png"
                      alt="whatsapp"
                      className="sosmed-footer"
                    />
                  </a>
                </Col>
                <Col lg={2} md={3} sm={2} xs={2}>
                  <a href="/">
                    <img
                      src="/images/youtube.png"
                      alt="youtube"
                      className="sosmed-footer"
                    />
                  </a>
                </Col>
              </Row>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Perpustakaan Universitas
              Bhataraja - All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer``;
