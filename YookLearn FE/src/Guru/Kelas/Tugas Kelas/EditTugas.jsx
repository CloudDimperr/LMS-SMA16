import React, { useState, useRef, useEffect } from "react";
import HeaderGuru from "../../HeaderGuru";
import HeaderKelas from "../HeaderKelas";
import Form from "../../Form";
import { BiArrowBack } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import Header from "../../Header";
import ButtonTambahMateri from "../Materi Kelas/ButtonTambahMateri";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCurrentTugas, updateTugas } from "../../services/GuruAPI";
import { isAuthenticated } from "../../../Common/services/Auth";

function EditTugas({ onFileUpload }) {
  const navigate = useNavigate();
  const login = isAuthenticated("guru");
  const { idMapel, idTugas } = useParams();
  const [gambar, setGambar] = useState(null);
  const [judul, setJudul] = useState("");

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCurrentTugas(idMapel, idTugas);
      setJudul(data.judul_tugas);
      // setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setGambar(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gambar) {
      console.log("No file selected");
      return;
    }
    try {
      const isSuccess = await updateTugas(idMapel, idTugas, judul, gambar);
      console.log(isSuccess);
      if (isSuccess) {
        console.log("Assigment added successfully");
        navigate(`/guru/mapel/${idMapel}/daftar-tugas`);
      }
    } catch (error) {
      console.log("Error adding assigment:", error);
    }
  };

  return (
    <div>
      <Header></Header>
      <HeaderGuru></HeaderGuru>
      <HeaderKelas idMapel={idMapel}></HeaderKelas>
      <div className="bg-tosca mt-10 mx-10 p-2">
        <a href={`/guru/mapel/${idMapel}/daftar-tugas`}>
          <BiArrowBack className="bg-white text-xl"></BiArrowBack>
        </a>
      </div>

      <h1 className="text-xl mt-8 ml-10 font-medium text-biru">Tambah Tugas</h1>

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
          />
          <div className="form-input-row mt-5">
            <label
              className="text-md mt-10 ml-10 font-normal text-biru"
              htmlFor="fileInput"
            >
              Lampiran
            </label>
            <input id="fileInput" type="file" onChange={handleFileChange} />
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
