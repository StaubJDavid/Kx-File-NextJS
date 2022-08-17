import axios from "axios";
import { useEffect, useState } from "react";
//import download from 'downloadjs';
import download from 'js-file-download';
import { saveAs } from "file-saver";

const DownloadButton = () => {

    const [user, setUser] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = "exd";
    },[])

    const downloadClick = async () => {
        try {
            //USING EXPRESS API BLOB
            /*const result = await fetch("http://localhost:3001/files/downloadBlob?" + new URLSearchParams({path:user, filename: fileName}),
                                        {
                                            method: "GET",
                                            mode: "cors"
                                        }
                                        );

            const blob = await result.blob();
            download(blob, fileName);*/
            //console.log(result);

            //Using NextJS API BLOB
            /*const result = await fetch("http://localhost:3000/api/file/download",
                                        {
                                            method: "POST",
                                            mode: "cors",
                                            headers: {
                                                'Content-Type': 'application/json',
                                              },
                                            body: JSON.stringify({
                                                path: user,
                                                filename: fileName
                                            })
                                        }
                                        );

            const blob = await result.blob();
            download(blob, fileName);
            console.log(result);*/

            //EXPRESS API URL
            //axios.defaults.headers.common['Authorization'] = "exd";
            /*const result = await axios.post("http://localhost:3001/files/download",{folder:user, filename: fileName} ,{headers:{"geci":"exd"}});
            console.log(result)
            download(result.data.url, fileName);*/
            /*const result = await axios.get("http://localhost:3001/files/downloadAttachement");
            console.log(result);*/

            /*axios.defaults.headers.common['Authorization'] = "exd";
            const result = await axios.post("http://localhost:3001/files/download",{folder:user, filename: fileName});
            console.log(result);
            console.log("saveAs");
            saveAs(
                `${result.data.url}?token=baba`,
                `saveAs${fileName}`
            );
            console.log("download");
            download(`${result.data.url}?token=baba`);
            console.log("done");*/
            //window.open("http://localhost:3001/private/babi/macuin.png?token=baba")

            const result = await axios.get("http://localhost:3001/files/test");
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        
    }

    /*const downloadFile = () => {
        axios.get("http://localhost:3001/files/downloadTest")
            .then(
                res => {
                    download(res.data, "macuin.png");
                }
            )
    }*/

    return (
    <div>
        <input 
            type="text"
            value={user}
            onChange={(e:any) => setUser(e.target.value)}
        />
        <br />
        <input 
            type="text"
            value={fileName}
            onChange={(e:any) => setFileName(e.target.value)}
        />
        <br />
        <button onClick={() => downloadClick()}>
            Click
        </button>
        <img src="http://localhost:3001/private/babi/macuin.png" />
    </div>
    );
}

export default DownloadButton;