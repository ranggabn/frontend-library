import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Row } from "react-bootstrap";
import { convertDate } from "../utils/convertDate";

export default function TableDetailPinjam({ data, changeStatus, notAccept }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters) &&
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Judul",
      dataIndex: "judul",
      key: "judul",
      width: "10%",
      ...getColumnSearchProps("judul"),
    },
    {
      title: "Jumlah Buku",
      dataIndex: "jumlah_buku",
      key: "jumlah_buku",
      width: "5%",
      ...getColumnSearchProps("jumlah_buku"),
    },
    {
      title: "Stok",
      dataIndex: "stok",
      key: "stok",
      width: "5%",
      ...getColumnSearchProps("stok"),
    },
    {
      title: "Tanggal Pengajuan",
      key: "insert_date",
      width: "10%",
      render: (text, record) => <p>{convertDate(record.insert_date)}</p>,
    },
    {
      title: "Tanggal Approval",
      key: "tanggal_approve",
      width: "10%",
      render: (text, record) => <p>{convertDate(record.tanggal_approve)}</p>,
    },
    {
      title: "Tanggal Pengembalian",
      key: "tanggal_pengembalian",
      width: "10%",
      render: (text, record) => (
        <p>{convertDate(record.tanggal_pengembalian)}</p>
      ),
    },
    {
      title: "Persetujuan",
      key: "persetujuan",
      width: "18%",
      render: (text, record) => (
        <>
          {record.status == 1 ? (
            <>
              <Button
                type="primary"
                size="large"
                onClick={() => changeStatus(record)}
                style={{ marginRight: "5px", width: "100px" }}
              >
                Setuju
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => notAccept(record, 7)}
                style={{ width: "100px" }}
                danger
              >
                Tolak
              </Button>
            </>
          ) : (
            <Badge
              className="site-badge-count-109"
              count={
                record.status == "1"
                  ? "Menunggu Persetujuan"
                  : record.status == "2"
                  ? "Disetujui"
                  : record.status == "3"
                  ? "Belum Diambil"
                  : record.status == "4"
                  ? "Diambil"
                  : record.status == "5"
                  ? "Dikembalikan"
                  : record.status == "6"
                  ? "Dibatalkan"
                  : record.status == "7"
                  ? "Tidak Disetujui"
                  : ""
              }
              style={{
                backgroundColor:
                  record.status == "6" || record.status == "7"
                    ? "#f5222d"
                    : "#52c41a",
              }}
            />
          )}
        </>
      ),
    },
    {
      title: "Status Buku",
      key: "status_buku",
      width: "12%",
      render: (text, record) => (
        <>
          {record.status == "3" ? (
            <Button
              type="primary"
              size="large"
              className="btn-acc"
              onClick={() => notAccept(record, 4)}
              style={{ marginRight: "5px" }}
            >
              Diambil
            </Button>
          ) : (
            record.status == "4" && (
              <Button
                type="primary"
                size="large"
                onClick={() => notAccept(record, 5)}
                style={{ marginRight: "5px" }}
              >
                Dikembalikan
              </Button>
            )
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Row className="row-table">
        <Table columns={columns} dataSource={data} />
      </Row>
    </>
  );
}
