import React, { useState } from 'react'
import HeaderGuru from '../../../HeaderGuru'
import HeaderKelas from '../../HeaderKelas'
import Form from '../../../Form'
import Opsi from './Opsi'
import Header from '../../../../admin/pages/Header'

function TambahSoal() {
    const [opsiList, setOpsiList] = useState([]);

    const handleAddOpsi = () => {
      setOpsiList([...opsiList, ""]);
    };
  
    const handleOpsiChange = (index, value) => {
      const updatedOpsiList = [...opsiList];
      updatedOpsiList[index] = value;
      setOpsiList(updatedOpsiList);
    };

  return (
    <div>
        <Header></Header>
        <HeaderGuru></HeaderGuru>
        <HeaderKelas></HeaderKelas>

        <h1 className='text-xl mt-8 ml-10 font-medium text-biru'>Tambah Soal</h1>

        <div className='mt-10'>
            <div>
                <span className='text-xl ml-10 font-medium text-biru'>1.</span>
            </div>
            <div className='bg-tosca mx-10 mt-5 pb-5'>
                <div className='flex justify-between'>
                    <div className='w-full ml-8 mr-16 mt-8'>
                        <span>Pertanyaan</span>
                        <Form mx="mx-0"></Form>
                    </div>
                    <div className='mr-10 flex flex-col gap-y-5 mt-8'>
                        <div>
                            <span>Jenis Pertanyaan</span>
                            <form>
                                <select name="" id="" className='bg-white outline-none appearance-none focus:border-indigo-600 flex py-2 pl-5 w-[360px] border-[0.3px] shadow-md mt-4'>
                                    <option value="">Pilihan Ganda</option>
                                    <option value="">Kotak Centang</option>
                                    <option value="">Essai</option>
                                </select>
                            </form>
                        </div>
                        <div>
                            <span>Lampiran</span>
                            <form className='w-fit mt-4'>
                                <input type="file" />
                            </form>   
                        </div>
                    </div>
                </div>
                <div className='flex gap-x-24 mt-8'>
                    <div className='ml-8 flex flex-col gap-y-3'>
                        <span>Jawaban</span>
                        <div className="container flex gap-x-8">
                            <div className='flex flex-col gap-y-5'>
                                {opsiList.map((opsi, index) => (
                                    <Opsi
                                    key={index}
                                    value={opsi}
                                    onChange={(value) => handleOpsiChange(index, value)}
                                    />
                                ))}    
                            </div>
                            
                            <p
                                className="text-biru cursor-pointer flex items-end mb-2"
                                onClick={handleAddOpsi}
                            >
                                Tambahkan Opsi
                            </p>
                        </div>
                        
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <span>
                            Poin Soal
                        </span>
                        <input type="number" min={0} max={100} className='bg-white outline-none appearance-none focus:border-indigo-600 flex py-2 pl-5 w-fit border-[0.3px] shadow-md'/>
                    </div>
                </div>
                <div className='flex gap-x-6 mt-4 justify-end mr-8'>
                    <a href="" className='text-biru my-auto'>Hapus</a>
                    <a href="" className='text-white bg-biru py-2 px-3 rounded-lg'>Tambah</a>
                </div>
            </div>
        </div>

    </div>
  )
}

export default TambahSoal