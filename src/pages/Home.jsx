import React, { useEffect, useState } from "react";
import TableCustom from "../components/TableCustom";
import axios from "axios";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Input } from "antd";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios("http://localhost:3000/product")
      .then((res) => {
        const updatedProducts = res.data.map((item, index) => {
          switch (item.productType) {
            case "1":
              item.productType = "Mavalar";
              break;
            case "2":
              item.productType = "Sabzavotlar";
              break;
            case "3":
              item.productType = "Ziravorlar";
              break;
            default:
              item.productType = "Noma'lum";
          }
          return {
            ...item,
            key: item.id,
            ID: index + 1,
            action: (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteBtn(item.id)}
                  className="w-[30px] bg-[red] text-white border-[red] h-[30px] hover:text-[red] hover:border-[red] hover:bg-white border-transparent duration-300 border-[1px] rounded-full"
                >
                  <DeleteOutlined />
                </button>
                <button
                  onClick={() => navigate(`update/${item.id}`)}
                  className="w-[30px] bg-[green] text-white border-[green] h-[30px] hover:text-[green] hover:border-[green] hover:bg-white border-transparent duration-300 border-[1px] rounded-full"
                >
                  <EditOutlined />
                </button>
                <button
                  onClick={() => navigate(item.id)}
                  className="w-[30px] bg-[blue] text-white border-[blue] h-[30px] hover:text-[blue] hover:border-[blue] hover:bg-white border-transparent duration-300 border-[1px] rounded-full"
                >
                  <MoreOutlined />
                </button>
              </div>
            ),
          };
        });
        setProducts(updatedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setIsLoading(false));
  }, [refresh]);

  function handleDeleteBtn(id) {
    axios
      .delete(`http://localhost:3000/product/${id}`)
      .then(() => {
        setIsLoading(true);
        setTimeout(() => {
          setRefresh(!refresh);
          toast.success("Successfully deleted");
        }, 800);
      })
      .catch(() => toast.error("You have some error"));
  }

  function handleAddBtn() {
    navigate("/add-product");
  }

  function handleSearchProduct(e) {
    const value = e.target.value.toLowerCase();
    if (value) {
      const filteredProducts = products.filter((item) =>
        item.productName.toLowerCase().includes(value)
      );
      setProducts(filteredProducts);
    } else {
      setRefresh(!refresh);
    }
  }

  return (
    <div className="p-5 h-[100vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[25px] font-bold">Products</h2>
          <span className="text-[15px] text-slate-500">
            Products({products.length})
          </span>
        </div>
        <Button
          type="primary"
          className="hover:opacity-50"
          onClick={handleAddBtn}
        >
          Add Products
        </Button>
      </div>
      <div className="my-5">
        <Input
          onChange={handleSearchProduct}
          className="p-2 w-[300px]"
          size="large"
          allowClear
          placeholder="Search product by name"
        />
      </div>
      <div>
        <TableCustom products={products} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Home;
