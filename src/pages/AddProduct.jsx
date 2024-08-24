import { Button, DatePicker, Input } from "antd";
import React, { useEffect, useState } from "react";
import SeletCustom from "../components/SelectCustom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAxios } from "../hook/useAxios";
import dayjs from "dayjs";

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();

  const nowDate = dayjs().format("YYYY-MM-DD");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productDate, setProductDate] = useState(nowDate);

  const changeDate = (date, dateString) => {
    setProductDate(dateString);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const data = {
      productName,
      productPrice,
      productType,
      productDate,
    };

    const axiosInstance = useAxios();

    if (id) {
      axiosInstance
        .put(`product/${id}`, data)
        .then((res) => {
          toast.success("Successfully updated");
          setTimeout(() => {
            navigate("/");
          }, 800);
        })
        .catch((err) => {
          toast.error("You have some error! ");
        });
    } else {
      axiosInstance
        .post("product", data)
        .then((res) => {
          toast.success("Successfully added");
          setTimeout(() => {
            navigate("/");
          }, 800);
        })
        .catch((err) => {
          toast.error("You have some error! ");
        });
    }
  };

  useEffect(() => {
    if (id) {
      const axiosInstance = useAxios();
      axiosInstance
        .get(`/product/${id}`)
        .then((res) => {
          setProductName(res.data.productName);
          setProductPrice(res.data.productPrice);
          setProductType(res.data.productType);
          setProductDate(res.data.productDate);
        })
        .catch((err) => {
          toast.error("Failed to fetch product data");
        });
    }
  }, [id]);

  return (
    <form
      className="space-y-[10px] h-[100vh] overflow-y-auto"
      onSubmit={handleAddProduct}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="scale-y-125" />
          </button>
          <h2 className="text-[20px] font-bold">
            {id ? "Update" : "Add"} Product
          </h2>
        </div>
        <Button
          className="!bg-[green] hover:opacity-50 px-[15px]"
          htmlType="submit"
          type="primary"
          size="large"
        >
          {id ? "Update" : "Save"} Product
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
        <SeletCustom
          setProductType={setProductType}
          productType={productType}
        />
        <DatePicker
          value={dayjs(productDate, "YYYY-MM-DD")}
          required
          size="large"
          className="p-2 w-[100%]"
          onChange={changeDate}
          format="YYYY-MM-DD"
        />
      </div>
    </form>
  );
}

export default Product;
