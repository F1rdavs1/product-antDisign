import React, { useEffect, useState } from "react";
import TableCustom from "../components/TableCustom";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/product");
        const updatedProducts = res.data.map((item) => {
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
            action: (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteBtn(item.id)}
                  className="w-[30px] bg-[red] text-white border-[red] h-[30px] hover:text-[red] hover:border-[red] hover:bg-white border-transparent duration-300 border-[1px] rounded-full"
                >
                  <DeleteOutlined />
                </button>
                <button className="w-[30px] bg-[green] text-white border-[green] h-[30px] hover:text-[green] hover:border-[green] hover:bg-white border-transparent duration-300 border-[1px] rounded-full">
                  <EditOutlined />
                </button>
              </div>
            ),
          };
        });
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/${id}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-5 h-[100vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[25px] font-bold">Mahsulotlar</h2>
          <span className="text-[15px] text-slate-500">
            Mahsulotlar({products.length})
          </span>
        </div>
      </div>
      <div className="mt-[10px]">
        {isLoading ? <p>Loading...</p> : <TableCustom products={products} />}
      </div>
    </div>
  );
}

export default Home;
