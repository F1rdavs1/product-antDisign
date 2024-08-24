import React, { useState } from "react";
import { MinusCircleOutlined, ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import ProductLogo from "../assets/images/product-logo.png";
import { Link } from "react-router-dom";
const items = [
  {
    key: "1",
    icon: <ProductOutlined className="scale-[1.5]" />,
    label: <p className="text-[25px] pl-[5px]">Product</p>,
    children: [
      {
        key: "12",
        label: (
          <Link to={"/add-product"} className="text-[18px]">
            Add Products
          </Link>
        ),
        icon: <MinusCircleOutlined className="scale-[1.2]" />,
      },
    ],
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const Navbar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <div className="h-[100vh]">
      <div className="h-[20%] bg-[#001529] flex items-center justify-center">
        <img
          className="w-[150px] h-[150px]"
          src={ProductLogo}
          alt="Site logo"
          width={150}
          height={150}
        />
        <h2 className="text-white text-[20px]">My Product</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["231"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          width: "100%",
          height: "80%",
        }}
        items={items}
      />
    </div>
  );
};

export default Navbar;
