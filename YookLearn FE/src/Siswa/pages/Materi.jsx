import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../Common/services/Auth";
import { useNavigate, useParams } from "react-router-dom";

import { BsFillJournalBookmarkFill } from "react-icons/bs";
import Header from "../components/Header";
import Nav from "../components/Nav";
import MateriTitle from "../components/MateriTitle";
import { Link } from "react-router-dom";
import {
  fetchCurentMapelMateri,
  fetchCurrentMapel,
} from "../services/SiswaAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "./LoadingPage";

function Materi() {
  const navigate = useNavigate();
  const login = isAuthenticated("siswa");
  const { idKelas, idMapel } = useParams();
  const [mapel, setMapel] = useState([]);
  const [dataMateri, setMateri] = useState([]);

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  useEffect(() => {
    async function fetchData() {
      const [mapelData, materiData] = await Promise.all([
        fetchCurrentMapel(idMapel),
        fetchCurentMapelMateri(idMapel),
      ]);
      setMapel(mapelData);
      setMateri(materiData);
      setIsLoading(false);
    }
    fetchData();
  }, [idMapel]);

  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div>
        <Header />
        <Nav />
      </div>
      <div className="flex flex-col justify-between">
        <div className="mt-16 ml-10 w-1/2 flex">
          <BsFillJournalBookmarkFill className="text-2xl text-[#1A1F5A]" />
          <Link to={`/siswa/kelas/${idKelas}/detailkelas/${idMapel}`}>
            {" "}
            <h1 className="text-xl ml-5 text-slate-400 font-bold">
              {mapel.nama_matpel}
            </h1>{" "}
          </Link>
          <h1 className="text-xl ml-5 text-slate-400 font-bold">
            <FontAwesomeIcon icon={faAngleRight} className="text-slate-400" />
          </h1>
          <h1 className="text-xl ml-5 text-slate-400 font-bold">Materi</h1>
        </div>
      </div>
      <div className="flex flex-col">
        {dataMateri.map((materi) => (
          <Link
            key={materi.id}
            to={`/siswa/kelas/${idKelas}/detailkelas/${idMapel}/materi/${materi.id}/detailmateri`}
          >
            <MateriTitle
              pertemuan={`${materi.judul_materi}`}
              tglUpload={`Diupload: ${materi.created_at}`}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Materi;
