import { Button, DatePicker, Input } from "antd";
import React, { useState } from "react";
import SeletCustom from "../components/SelectCustom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productDate, setProductDate] = useState("");

  const changeDate = (date, dateString) => {
    setProductDate(dateString);
  };
  function handleAddProduct(e) {
    e.preventDefault();
    const dataObj = {
      productName,
      productPrice,
      productType,
      productDate,
    };
    axios
      .post("http://localhost:3000/product", dataObj)
      .then((res) => {
        toast.success("Mahsulotlar qoshildi");
        setTimeout(() => {
          navigate("/");
        }, 800);
      })
      .catch((err) => {
        toast.error("Xatolik bor");
      });
  }
  return (
    <form
      className="space-y-[10px] h-[100vh] overflow-y-auto"
      onSubmit={handleAddProduct}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-[20px] font-bold">ADD Product</h2>
        <Button
          className="!bg-[green] hover:opacity-50 px-[15px]"
          htmlType="submit"
          type="primary"
          size="large"
        >
          Save Product
        </Button>
      </div>
      <div className="w-[450px] p-5 space-y-[10px]">
        <Input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          className="py-2"
          allowClear
          type="text"
          size="large"
          placeholder="Enter product name"
          required
          name="productName"
          autoComplete="off"
        />
        <Input
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          className="py-2"
          type="number"
          size="large"
          placeholder="Enter product price"
          required
          name="product-name"
          autoComplete="off"
        />
        <SeletCustom setProductType={setProductType} />
        <DatePicker
          required
          size="large"
          className="p-2 w-[100%]"
          onChange={changeDate}
        />
      </div>
    </form>
  );
}

export default Product;
