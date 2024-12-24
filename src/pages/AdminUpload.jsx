import Header from "../components/Header";
import { useTheme } from "../ThemeContext";
import FileUploadComponent from "../components/admin/FileUpload";

export default function AdminUpload() {
  const { theme } = useTheme();
  return (
    <div className="h-screen lg:px-3 lg:py-5 ">
       <div
         className={`h-full overflow-hidden flex flex-column border-1 border-round-lg ${
           theme === "light" ? "bg-white  border-400 " : "surface-800 border-700"
         }`}
       >
         <div className="">
           <Header />
         </div>
         <div className="h-full" style={{backgroundImage: 'url("/upload-bg.jpg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
         <div className={`flex flex-column align-items-center justify-content-center ${theme==='light' ? "bg-white-alpha-80" : "bg-black-alpha-70"}  h-full`}>

            <h1 className={`text-6xl ${theme==='light' ? "text-gray-800" : "text-200"} text-center m-0`}>Upload Knowledge base to trainAi</h1>
            <img src="/ai-vactor-upload.png" alt="upload" className="w-15rem h-15rem" />
            <FileUploadComponent />
         </div>
         </div>
       </div>
     </div>
  );
}
