import React, { useEffect, useState } from "react";
import HeaderGuru from "../../../HeaderGuru";
import HeaderKelas from "../../HeaderKelas";
import { BiArrowBack } from "react-icons/bi";
import BoxDaftarSoalEssay from "./BoxDaftarSoalEssay";
import Header from "../../../Header";
import { useParams } from "react-router-dom";
import LoadingPage from "../../../../Siswa/pages/LoadingPage";
import {
  fetchCurrentMapel,
  fetchHasilPerseta,
  fetchPoinSiswa,
} from "../../../services/GuruAPI";
import TambahPoinUjian from "./TambahPoinUjian";

function HasilUjianSiswa() {
  const { idMapel, idUjian, idSiswa } = useParams();
  const [dataMapel, setMapel] = useState([]);
  const [dataUjian, setUjian] = useState([]);
  const [dataPoin, setDataPoin] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [mapelData, ujianData, poinData] = await Promise.all([
        fetchCurrentMapel(idMapel),
        fetchHasilPerseta(idUjian, idSiswa),
        fetchPoinSiswa(idUjian, idSiswa),
      ]);

      setMapel(mapelData);
      setUjian(ujianData);
      if (poinData) {
        setDataPoin(poinData.nilai);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleOnClose = () => {
    setShowModal(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="mb-20">
      <Header></Header>
      <HeaderGuru></HeaderGuru>
      <HeaderKelas dataMapel={dataMapel}></HeaderKelas>
      <div className="bg-tosca mt-10 mx-10 p-2">
        <a href={`/guru/mapel/${idMapel}/ujian/${idUjian}/hasil-ujian-peserta`}>
          <BiArrowBack className="bg-white text-xl"></BiArrowBack>
        </a>
      </div>
      <div className="flex justify-between mt-8 ml-10">
        <h1 className="text-xl font-medium text-biru">Hasil Ujian Siswa</h1>
        <div className="mr-28 flex flex-col">
          <span>Poin yang diperoleh</span>
          <span className="text-md mt-5 py-2 px-3 border-[0,3px] shadow-md text-biru">
            {dataPoin || 0}/100
          </span>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span className="text-md flex mt-1 text-biru">Tambahkan Poin</span>
          </button>
          {showModal && (
            <TambahPoinUjian
              onClose={handleOnClose}
              visible={showModal}
              nilai={dataPoin || 0}
              idSiswa={idSiswa}
              idUjian={idUjian}
              setDataPoin={setDataPoin}
            />
          )}
        </div>
      </div>

      {dataUjian.map((item, index) => (
        <div className="essay" key={index}>
          <span className="flex mt-2 ml-10 text-lg font-semibold text-biru">
            {index + 1}
          </span>
          <BoxDaftarSoalEssay soal={item} />
        </div>
      ))}
    </div>
  );
}

export default HasilUjianSiswa;
