import {useRef, useState} from "react";
import axios from "axios";
import {SyncLoader} from "react-spinners";


interface UploadProps{
    setUserPic : (newPic:string)=> void
}

export default function Upload({setUserPic}:UploadProps) {
    const [picture, setPicture] = useState();
    const [readablePic, setReadablePic] = useState("");
    const [loading, setLoading] = useState(false)

    const inputRef = useRef();

    const handlePicture = (e) => {
        let pic = e.target.files[0];
        setPicture(pic)

        // pic.size > 1024 * 1024 * 5   5mg
        // console.log(pic)

        const render = new FileReader();
        render.readAsDataURL(pic);
        render.onload = (e) => {
            setReadablePic(e.target.result);
        }
    }

    const uploadCloud = async ()=>{
        let formData = new FormData();
        formData.append("upload_preset",import.meta.env.VITE_CLOUDINARY_SECRET)
        formData.append("file",picture);

       try {
           setLoading(true)
           const {data}= await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
               formData
           )

           setLoading(false)
           // console.log(data)
           setUserPic(data.secure_url)
       }catch (err){
           console.log(err)
       }

    }



    return (
        <>

            {readablePic
                ?
                <div>
                    <img
                        alt={"image"}
                        src={readablePic}
                        className={"w-16 h-16 rounded-full"}
                    />
                    <button onClick={() => inputRef.current.click()}>edit image</button>
                </div>
                :
                <button onClick={() => inputRef.current.click()}>upload image </button>
            }

            <input
                type={"file"}
                hidden
                ref={inputRef}
                // accept={"image/png,image/jpeg,image/webp"}
                onChange={handlePicture}
            />


            <br/>
            <button onClick={uploadCloud}>
                {!loading && "upload"}
                <SyncLoader size={10} loading={loading} />
            </button>

        </>
    )
}
