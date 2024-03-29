import React from "react";
import { AiOutlineDatabase, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const EditAkun = () => {
  return (
    <div className="bg-[#1A1F5A] flex font-bold flex-col w-[340px] mr-10 rounded-lg">
      <button className="text-white px-5 pt-5 flex ">
        <Link to="/siswa/datadiri">
          {" "}
          <AiOutlineDatabase /> Data Diri
        </Link>
      </button>
      <button className="text-white px-5 pt-5 pb-5 flex">
        <Link to="/siswa/ubahpass">
          {" "}
          <AiFillEdit /> Ubah Kata Sandi
        </Link>
      </button>
    </div>
  );
};
export default EditAkun;
