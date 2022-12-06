import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

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
                  <Link href="/">Registrasi Anggota Baru</Link>
                </li>
                <li className="mb-1">
                  <Link href="/">Pinjaman Buku Offline</Link>
                </li>
                <li className="mb-1">
                  <Link href="/">Pinjaman Buku Online</Link>
                </li>
                <li className="mb-1">
                  <Link href="/">Fotocopy</Link>
                </li>
                <li className="mb-1">
                  <Link href="/">Panduan Skripsi & Thesis</Link>
                </li>
                <li className="mb-1">
                  <Link href="/">Ruang Baca</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Tentang Kami</h4>
              <ul className="ml-4">
                <li className="mb-2">
                  <Link href="/">Sejarah</Link>
                </li>
                <li className="mb-2">
                  <Link href="/">Visi & Misi</Link>
                </li>
                <li className="mb-2">
                  <Link href="/">Motto</Link>
                </li>
                <li className="mb-2">
                  <Link href="/">Pengurus Perpustakaan</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4 className="mb-3">Sosial Media</h4>
              <Row>
                <Col lg={2} md={3} sm={2} xs={2}>
                  <Link href="">
                    <img
                      src="/images/instagram.png"
                      alt="instagram"
                      className="sosmed-footer"
                    />
                  </Link>
                </Col>
                <Col lg={2} md={3} sm={2} xs={2}>
                  <Link href="">
                    <img
                      src="/images/whatsapp.png"
                      alt="whatsapp"
                      className="sosmed-footer"
                    />
                  </Link>
                </Col>
                <Col lg={2} md={3} sm={2} xs={2}>
                  <Link href="/">
                    <img
                      src="/images/youtube.png"
                      alt="youtube"
                      className="sosmed-footer"
                    />
                  </Link>
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
