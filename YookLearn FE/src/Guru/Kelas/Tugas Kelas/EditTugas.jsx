import React, { useState, useRef, useEffect } from "react";
import HeaderGuru from "../../HeaderGuru";
import HeaderKelas from "../HeaderKelas";
import { BiArrowBack } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import Header from "../../Header";
import ButtonTambahMateri from "../Materi Kelas/ButtonTambahMateri";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCurrentMapel,
  fetchCurrentTugas,
  updateTugas,
} from "../../services/GuruAPI";
import { isAuthenticated } from "../../../Common/services/Auth";
import LoadingPage from "../../../Siswa/pages/LoadingPage";

function EditTugas({ onFileUpload }) {
  const navigate = useNavigate();
  const login = isAuthenticated("guru");
  const { idMapel, idTugas } = useParams();
  const [file, setFile] = useState(null);

  const [judul, setJudul] = useState("");
  const [tenggat, setTenggat] = useState(null);
  const [waktu, setWaktu] = useState(null);
  const [nilai, setNilai] = useState(0);
  const [tipeDeadline, setTipeDeadline] = useState("strict");
  const [dataMapel, setMapel] = useState([]);

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  useEffect(() => {
    async function fetchData() {
      const [tugasData, mapelData] = await Promise.all([
        fetchCurrentTugas(idMapel, idTugas),
        fetchCurrentMapel(idMapel),
      ]);
      setJudul(tugasData.judul_tugas);
      setMapel(mapelData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected");
      return;
    }
    try {
      const combinedDeadline = waktu
        ? `${tenggat} ${waktu}`
        : `${tenggat} 23:59`;
      const isSuccess = await updateTugas(
        idMapel,
        idTugas,
        judul,
        file,
        combinedDeadline,
        nilai,
        tipeDeadline
      );

      if (isSuccess) {
        console.log("Assigment edit successfully");
        navigate(`/guru/mapel/${idMapel}/daftar-tugas`);
      }
    } catch (error) {
      console.log("Error adding assigment:", error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Header></Header>
      <HeaderGuru></HeaderGuru>
      <HeaderKelas dataMapel={dataMapel}></HeaderKelas>{" "}
      <div className="bg-tosca mt-10 mx-10 p-2">
        <a href={`/guru/mapel/${idMapel}/daftar-tugas`}>
          <BiArrowBack className="bg-white text-xl"></BiArrowBack>
        </a>
      </div>
      <h1 className="text-xl mt-8 ml-10 font-medium text-biru">Edit Tugas</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-md mt-8 ml-10 font-normal text-biru">
            Judul Tugas
          </h2>
          <input
            className="bg-white mx-10 mt-3 h-8 border-[0.3px] shadow-md w-[95%] py-1 px-2 focus:outline-none focus:ring-1"
            id="judul"
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
          <div className="form-input-row mt-5">
            <label
              className="text-md mt-10 ml-10 font-normal text-biru"
              htmlFor="fileInput"
            >
              Lampiran
            </label>
            <div>
              <input
                className="ml-10"
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <div className="flex ml-10 gap-x-9">
            <div>
              <h2 className="text-md mt-8 font-normal text-biru">Tenggat</h2>
              <div className="flex gap-x-8">
                <input
                  type="date"
                  name=""
                  id=""
                  className="mt-4 py-2 px-5 border-[0.3px] shadow-md"
                  value={tenggat}
                  onChange={(e) => setTenggat(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="text-md mt-8 font-normal text-biru">(Opsional)</h2>
              <div className="flex gap-x-8">
                <input
                  type="time"
                  name=""
                  id=""
                  className="mt-4 py-2 px-5 border-[0.3px] shadow-md"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h2 className="text-md mt-8 font-normal text-biru">Poin</h2>
              <div className="flex gap-x-8">
                <input
                  type="number"
                  name=""
                  id=""
                  min={0}
                  max={100}
                  className="mt-4 py-2 px-5 border-[0.3px] shadow-md"
                  value={nilai}
                  onChange={(e) => setNilai(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="text-md mt-8 font-normal text-biru">
                Setelah melewati tenggat waktu
              </h2>
              <div className="flex">
                <select
                  className="bg-white outline-none appearance-none focus:border-indigo-600 flex py-2 pl-5 w-[360px] border-[0.3px] shadow-md mt-4"
                  value={tipeDeadline}
                  onChange={(e) => setTipeDeadline(e.target.value)}
                  required
                >
                  <option value="strict">Tidak dapat mengumpulkan tugas</option>
                  <option value="unstrict">Dapat mengumpulkan tugas</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-end mr-10 gap-x-10 mb-20">
            <a
              href={`/guru/mapel/${idMapel}/daftar-tugas`}
              className="text-biru py-2"
            >
              Batal
            </a>
            <button
              className="text-white bg-biru py-2 px-5 rounded-md"
              type="submit"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        <h2 className="text-md mt-8 ml-10 font-normal text-biru">Isi Tugas</h2>
        <Form></Form>
      </div> */}
      {/* <div>
        <h2 className="text-md mt-8 ml-10 font-normal text-biru">Lampiran</h2>
        <div className="flex">
          <div>
            <ButtonTambahMateri onFileUpload={handleFileUpload} />
          </div>
          <span className="ml-5 my-auto ">Tidak ada file yang dipilih</span>
        </div>
      </div> */}
    </div>
  );
}

export default EditTugas;
