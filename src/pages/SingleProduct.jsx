import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hook/useAxios";
import CustomModal from "../components/CustomModal";

function SingleProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleDate, setSingleDate] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const axiosInstance = useAxios();
    axiosInstance.get(`/product/${id}`).then((res) => {
      setSingleDate(res.data);
    });
  }, []);
  function sureDeleteModal() {
    useAxios()
      .delete(`/product/${id}`)
      .then((res) => {
        setIsOpenModal(false);
        toast.success("Successfully");
        setTimeout(() => {
          navigate(-1);
        }, 800);
      })
      .catch(() => toast.error("You have some error"));
  }
  return (
    <div className="p-5">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="scale-y-125" />
          </button>
          <h2 className="text-[20px] font-bold">{singleDate?.productName}</h2>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsOpenModal(true)}
            className="!bg-[red] hover:opacity-50 px-[15px]"
            htmlType="submit"
            type="primary"
            size="large"
          >
            Delete
          </Button>
          <Button
            onClick={() => navigate(`/update/${id}`)}
            className="!bg-[green] hover:opacity-50 px-[15px]"
            htmlType="submit"
            type="primary"
            size="large"
          >
            Update Product
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <ul className="w-[50%] p-5 rounded-lg border-[2px] border-slate-500">
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Name</span>
            <strong className="text-[25px] leading-[19px]">
              {singleDate.productName}
            </strong>
          </div>
        </ul>
        <ul className="w-[50%] p-5 rounded-lg border-[2px] border-slate-500">
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Price</span>
            <strong className="text-[25px] leading-[19px]">
              {singleDate.productPrice}
            </strong>
          </div>
        </ul>
        <ul className="w-[50%] p-5 rounded-lg border-[2px] border-slate-500">
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Type</span>
            <strong className="text-[25px] leading-[19px]">
              {singleDate.productType == "1" ? "Mevalar" : ""}
              {singleDate.productType == "2" ? "Sabzavotlar" : ""}
              {singleDate.productType == "3" ? "Ziravorlar" : ""}
            </strong>
          </div>
        </ul>
        <ul className="w-[50%] p-5 rounded-lg border-[2px] border-slate-500">
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Date</span>
            <strong className="text-[25px] leading-[19px]">
              {singleDate.productDate}
            </strong>
          </div>
        </ul>
      </div>
      <CustomModal
        title={"Are you agree to delete product"}
        sureDeleteModal={sureDeleteModal}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      ></CustomModal>
    </div>
  );
}

export default SingleProduct;
