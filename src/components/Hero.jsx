import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx';

const Hero = () => {

    const [msg, setmsg] = useState("");
    const [status, setstatus] = useState(false);
    const [emailList,setEmailList]=useState([]);

    function handlemsg(e) {

        setmsg(e.target.value);
    }
    function handlefile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const emailList = XLSX.utils.sheet_to_json(sheet, { header: 'A' })
            const totalemail = emailList.map(function(item){return item.A})
            console.log(totalemail)
            setEmailList(totalemail);
        }

        reader.readAsBinaryString(file)

    }
    function send() {
        setstatus(true)

        axios.post("https://bulkmail-backend.onrender.com/sendmail", { msg: msg , emailList: emailList })
            .then(function (data) {
                if (data.data === true) {
                    console.log(data.data)
                    setstatus(false)
                    alert("mail sent succesfully")
                }
                else {
                    setstatus(false)
                    alert("mail not sent")
                }
            })
    }

    return (
        <div>

            <div className='bg-blue-950 text-white '>
                <h1 className='text-2xl text-center font-medium px-5 py-3'>Bulk mail</h1>
            </div>

            <div className='bg-blue-600 text-white '>
                <h1 className='font-medium text-center px-5 py-3'>We can help your business with sending multiple emaillist onece</h1>

            </div>
            <div className='bg-blue-500 text-white '>
                <h1 className='font-medium px-5 py-3 text-center'>Drag and Drop</h1>
            </div>

            <div className='bg-blue-400 text-white flex flex-col items-center justify-center px-5 py-2 '>

                <textarea onChange={handlemsg} value={msg} type="file" id="" className='w-[60%] h-32 py-2 my-2 outline-none px-2 border border-black rounded-md  text-black' placeholder='Enter email text'></textarea>
            </div>
            <div className='bg-blue-500 text-white items-center justify-center px-5 py-2 flex flex-col'>
                <input type="file" onChange={handlefile} className='border border-dashed py-4 px-4 mt-5 mb-5' />
                <p>Total Emails in the file: {emailList.length}</p>

                <div>
                    <button onClick={send} className='bg-blue-950 py-2 px-3 rounded mt-2 font-medium w-fit'>{status ? "sending..." : "send"}</button>
                </div>

            </div>

            <div className='bg-blue-400 text-white '>
                <h1 className='font-medium text-center px-5 py-6'></h1>

            </div>
            <div className='bg-blue-300 text-white '>
                <h1 className='font-medium text-center px-5 py-6'></h1>

            </div>

        </div>
    )
}

export default Hero





