import React from "react";
import { Alert } from "antd";
import { Col, Row } from "react-bootstrap";

export default function InfoCard() {
  return (
    <Row className="mb-5">
      <Col>
        <Alert
          description={
            <>
              <h5>Informasi Peminjaman</h5>
              <ul style={{ paddingLeft: "1rem" }}>
                <li>Peminjam harus anggota perpustakaan.</li>
                <li>Setiap anggota maksimal meminjam 2 buku.</li>
                <li>Waktu peminjaman maksimal adalah 5 hari kerja.</li>
                <li>
                  Pengurus akan menghubungi nomor telefon atau universitas
                  peminjam apabila terjadi sesuatu yang tidak diinginkan.
                </li>
              </ul>
              <h5>Informasi Denda</h5>
              <ul style={{ paddingLeft: "1rem" }}>
                <li>Denda dihitung berdasarkan jumlah buku yang dipinjam.</li>
                <li>
                  Untuk buku rusak atau sobek, peminjam wajib mengganti dengan
                  buku serupa.
                </li>
                <li>Denda perhari adalah Rp. 5000/buku.</li>
              </ul>
            </>
          }
          type="info"
          style={{ minHeight: "320px" }}
        />
      </Col>
    </Row>
  );
}
