import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faAngleLeft,
  faChalkboardTeacher,
  faFileImport,
  faGreaterThan,
  faLessThan,
  faMagnifyingGlass,
  faPen,
  faPersonChalkboard,
  faPlus,
  faTrash,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { fetchAllKelas } from "../services/AdminAPI";

function Daftar3() {
  const [dataKelas, setKelas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllKelas();
      setKelas(data);
    }
    fetchData();
  }, []);

  const handleEdit = async (idKelas) => {
    if (idKelas) {
      navigate(`/admin/edit/kelas/${idKelas}`);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          <a href="/admin/homepage">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-[#1A1F5A] text-3xl ml-2 pr-3"
            />
          </a>
          <h1 className="text-2xl font-bold text-[#1A1F5A] mb-4">
            List Paket Kelas
          </h1>
        </div>

        <div className="flex justify-end">
          <span className="flex items-center">
            <div className="bg-gray-200 p-2 rounded-md m-2">
              <a href="">
                <FontAwesomeIcon
                  icon={faFileImport}
                  className="text-[#1A1F5A] text-3xl ml-2"
                />
                <span className=" ml-2 mr-4 font-bold text-xl text-[#1A1F5A]">
                  Import
                </span>
              </a>
            </div>
            <div className="bg-gray-200 p-2 rounded-md">
              <a href="/admin/daftarpaket">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[#1A1F5A] text-3xl ml-2"
                />
                <span className=" ml-2 mr-4 font-bold text-xl text-[#1A1F5A]">
                  Tambahkan Paket
                </span>
              </a>
            </div>
          </span>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-none">
          <div className="p-2 bg-gray-200">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[#1A1F5A] px-2 pr-4"
            />
            <input
              type="text"
              className="w-11/12 border rounded-lg px-4 py-2"
              placeholder="Cari Paket"
            />
          </div>
          <div>
            <div className="flex justify-evenly p-10">
              <div className=" w-3/12">
                {dataKelas.map((kelas) => (
                  <a
                    href={`/admin/ListPaketKelas/${kelas.id}/siswa`}
                    key={kelas.id}
                  >
                    <div className="bg-[#1A1F5A] text-white rounded-t-md font-bold py-3 pl-12">
                      {kelas.nama_kelas}
                      <a
                        href={`/admin/edit/kelas/${kelas.id}`}
                        className=""
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          className="text-white pl-14"
                        />
                      </a>
                      <a
                        href={`/admin/hapus/kelas/${kelas.id}`}
                        className=""
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-white px-4"
                        />
                      </a>
                    </div>
                    <div className="text-[#1A1F5A] font-bold py-3 pl-2">
                      <FontAwesomeIcon
                        icon={faChalkboardTeacher}
                        className="text-[#1A1F5A] px-4"
                      />
                      {kelas.nama_guru}
                    </div>
                    <div className="text-[#1A1F5A] font-bold pl-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-[#1A1F5A] px-4"
                      />
                      {kelas.jumlah_siswa} Siswa
                    </div>
                  </a>
                ))}
              </div>
              <div className=" w-3/12">
                <a href="/admin/listsiswapaketkelas">
                  <div className="bg-[#1A1F5A] text-white rounded-t-md font-bold py-3 pl-12">
                    XI IPA 1
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-white pl-14"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-white px-4"
                    />
                  </div>
                  <div className="text-[#1A1F5A] font-bold py-3 pl-2">
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher}
                      className="text-[#1A1F5A] px-4"
                    />
                    Harper Lee
                  </div>
                  <div className="text-[#1A1F5A] font-bold pl-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-[#1A1F5A] px-4"
                    />
                    30 Siswa
                  </div>
                </a>
              </div>
              <div className=" w-3/12">
                <a href="/admin/listsiswapaketkelas">
                  <div className="bg-[#1A1F5A] text-white rounded-t-md font-bold py-3 pl-12">
                    XI IPA 1
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-white pl-14"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-white px-4"
                    />
                  </div>
                  <div className="text-[#1A1F5A] font-bold py-3 pl-2">
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher}
                      className="text-[#1A1F5A] px-4"
                    />
                    Harper Lee
                  </div>
                  <div className="text-[#1A1F5A] font-bold pl-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-[#1A1F5A] px-4"
                    />
                    30 Siswa
                  </div>
                </a>
              </div>
            </div>
            <div className="flex justify-evenly p-10">
              <div className=" w-3/12">
                <a href="/admin/listsiswapaketkelas">
                  <div className="bg-[#1A1F5A] text-white rounded-t-md font-bold py-3 pl-12">
                    XI IPA 1
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-white pl-14"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-white px-4"
                    />
                  </div>
                  <div className="text-[#1A1F5A] font-bold py-3 pl-2">
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher}
                      className="text-[#1A1F5A] px-4"
                    />
                    Harper Lee
                  </div>
                  <div className="text-[#1A1F5A] font-bold pl-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-[#1A1F5A] px-4"
                    />
                    30 Siswa
                  </div>
                </a>
              </div>
              <div className=" w-3/12">
                <a href="/admin/listsiswapaketkelas">
                  <div className="bg-[#1A1F5A] text-white rounded-t-md font-bold py-3 pl-12">
                    XI IPA 1
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-white pl-14"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-white px-4"
                    />
                  </div>
                  <div className="text-[#1A1F5A] font-bold py-3 pl-2">
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher}
                      className="text-[#1A1F5A] px-4"
                    />
                    Harper Lee
                  </div>
                  <div className="text-[#1A1F5A] font-bold pl-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-[#1A1F5A] px-4"
                    />
                    30 Siswa
                  </div>
                </a>
              </div>
              <div className=" w-3/12">
                <a href="/admin/listsiswapaketkelas">
                  <div className="bg-[#1A1F5A] text-white rounded-t-md font-bold py-3 pl-12">
                    XI IPA 1
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-white pl-14"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-white px-4"
                    />
                  </div>
                  <div className="text-[#1A1F5A] font-bold py-3 pl-2">
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher}
                      className="text-[#1A1F5A] px-4"
                    />
                    Harper Lee
                  </div>
                  <div className="text-[#1A1F5A] font-bold pl-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-[#1A1F5A] px-4"
                    />
                    30 Siswa
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <div className="px-2">
              <FontAwesomeIcon icon={faLessThan} className="text-[#1A1F5A]" />
            </div>
            <div className="px-2">1</div>
            <div className="px-2">2</div>
            <div className="px-2">3</div>
            <div className="px-2">...</div>
            <div className="px-2">9</div>
            <div className="px-2">10</div>
            <div className="px-2">
              <FontAwesomeIcon
                icon={faGreaterThan}
                className="text-[#1A1F5A]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daftar3;
