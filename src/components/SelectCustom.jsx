import React from "react";
import { Select } from "antd";
const SeletCustom = ({ setProductType }) => {
  function handleChange(id, obj) {
    setProductType(id);
  }
  return (
    <Select
      className="w-full"
      onChange={handleChange}
      size="large"
      allowClear
      showSearch
      placeholder="Mahsulot turini tanlang!"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: "1",
          label: "Mevalar",
        },
        {
          value: "2",
          label: "Sabzavotlar",
        },
        {
          value: "3",
          label: "Ziravorlar",
        },
      ]}
    />
  );
};
export default SeletCustom;
