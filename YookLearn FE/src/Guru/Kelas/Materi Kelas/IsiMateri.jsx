import React, { useEffect, useState } from "react";
import Header from "../../Header";
import HeaderKelas from "../HeaderKelas";
import { BiArrowBack, BiBook } from "react-icons/bi";
import { BsSaveFill } from "react-icons/bs";
import HeaderGuru from "../../HeaderGuru";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../../../Common/services/Auth";
import {
  fetchAllMateri,
  fetchCurrentMapel,
  fetchCurrentMateri,
} from "../../services/GuruAPI";
import LoadingPage from "../../../Siswa/pages/LoadingPage";

function IsiMateri() {
  const BASE_URL = import.meta.env.VITE_BASE_DOWNLOAD_URL;
  const { idMapel, idMateri } = useParams();
  const navigate = useNavigate();
  const login = isAuthenticated("guru");
  const [dataMateri, setMateri] = useState([]);
  const [dataMapel, setMapel] = useState([]);

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  useEffect(() => {
    async function fetchData() {
      const [materiData, mapelData] = await Promise.all([
        fetchCurrentMateri(idMapel, idMateri),
        fetchCurrentMapel(idMapel),
      ]);
      setMateri(materiData);
      setMapel(mapelData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Header></Header>
      <HeaderKelas dataMapel={dataMapel}></HeaderKelas>

      <div className="bg-tosca mt-10 mx-10 p-2">
        <a href={`/guru/mapel/${idMapel}/daftar-materi`}>
          <BiArrowBack className="bg-white text-xl"></BiArrowBack>
        </a>
      </div>

      <div className="flex ml-10 mt-10 gap-x-5">
        <BiBook
          className="bg-tosca
        text-biru text-5xl rounded-full p-2"
        ></BiBook>
        <span className="text-biru text-xl my-auto font-medium">
          {dataMateri.judul_materi}
        </span>
      </div>

      <div className="flex ml-[110px] mt-10 gap-x-5 text-biru">
        <span className="bg-tosca p-3 rounded-lg">{dataMateri.filename}</span>
        <a href={`${BASE_URL}/${dataMateri.filename}`} download>
          <BsSaveFill className="bg-tosca p-[0.6rem] my-auto text-[2.5rem] rounded-lg"></BsSaveFill>
        </a>
      </div>
    </div>
  );
}

export default IsiMateri;
