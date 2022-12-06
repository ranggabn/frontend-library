import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis lectus sem. Etiam ornare malesuada sem, a maximus erat tincidunt a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc porttitor mi lacinia, ullamcorper metus eu, viverra felis. Vestibulum viverra nisi quis odio bibendum, quis ultricies massa bibendum. Curabitur nunc nisi, pretium quis venenatis ut, dictum quis felis. Ut ornare porta ex, faucibus dignissim tellus tincidunt eu.
`;
const CollapseComp = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse defaultActiveKey={["1", "2", "3"]} onChange={onChange}>
      <Panel
        header="Apa saja layanan yang tersedia pada perpustakaan ini?"
        key="1"
      >
        <p>{text}</p>
      </Panel>
      <Panel
        header="Bagaimana cara mendaftar sebagai anggota perpustakaan?"
        key="2"
      >
        <p>{text}</p>
      </Panel>
      <Panel header="Bagaimana cara meminjam buku di perpustakaan?" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};
export default CollapseComp;
