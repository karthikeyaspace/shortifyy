import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaClipboard } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdQrCodeScanner } from "react-icons/md";
import Toast from "../components/Toast";
import { useLocation } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";

const API_URL = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortLink, setShortLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [qr, setQr] = useState<boolean>(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get("url");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (url) Toast.Info("URL Not Found");
  }, [url]);

  const handleLongLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortLink("");
    setQr(false);
    setLongUrl(e.target.value);
  };

  const handleLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!longUrl) {
      Toast.Error("Please Enter a Valid Url");
      return;
    }
    const data = {
      longUrl: longUrl,
    };

    setLoading(true);
    await axios
      .post(API_URL, data)
      .then((res) => {
        if (res.data.message === "short url created") {
          Toast.Success("Short Link created");
          setShortLink(res.data.payload.shortUrl);
        } 
        else if (res.data.message === "url already exists") {
          Toast.Success("Short Link already exists");
          setShortLink(res.data.payload.shortUrl);
        } 
        else if (res.data.message === "invalid url") 
          Toast.Error("Please Enter a Valid Url");
        else 
          Toast.Error("Something went wrong");
        
      })
      .catch((err) => {
        console.log(err);
        Toast.Error("Something went wrong");
      });
    setLoading(false);
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    Toast.Success("Copied to Clipboard");
  };

  const handleQrDownload = () => {
    if (qrRef.current) {
      const qrCanvas = qrRef.current.querySelector("canvas");
      if (qrCanvas) {
        const url = qrCanvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-[90%] sm:w-[80%] lg:w-[60%] h-full m-auto flex flex-col justify-center items-center sm:pt-16 mb-20">
        <h1 className="text-3xl md:text-5xl">
          Enter your Long link to get Our Shortn Link to make your life easier
        </h1>
        <form
          className="w-full mt-5 lg:mt-10 flex flex-col lg:flex-row gap-1"
          onSubmit={handleLinkSubmit}
        >
          <div className="w-full flex flex-col sm:flex-row gap-1">
            <input
              type="text"
              placeholder="Enter your Long Url"
              className="w-full sm:w-3/4 p-3 sm:p-4 md:px-5 md:py-4 text-xl h-full font-sans bg-transparent border-2 border-white/40 focus:border-white focus:border-2 focus:outline-none rounded-sm sm:rounded-r-none sm:rounded-l-md"
              onChange={handleLongLink}
            />
            <button
              className={`h-full w-[150px] m-auto mt-4 py-2 md:py-0 sm:mt-0 sm:w-1/4 text-xl border-2 border-white/40 justify-center items-center hover:font-bold hover:border-2 hover:border-white active:bg-white active:text-black rounded-sm sm:rounded-l-none sm:rounded-r-md flex  ${
                loading ? "bg-white cursor-not-allowed" : "bg-black"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters
                  className="animate-spin"
                  size={20}
                  color="black"
                />
              ) : (
                "Shortn"
              )}
            </button>
          </div>
        </form>

        <div
          className={` mt-10 flex flex-col sm:flex-row gap-5 sm:gap-10  items-center ${
            shortLink ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-24 sm:h-32 sm:p-3 sm:px-10 relative flex justify-center items-center bg-white rounded-sm">
            <p className="text-xl sm:text-2xl font-sans px-5 mb-3 text-black">
              {shortLink}
            </p>
            <IoMdClose
              size={24}
              color="black"
              className="cursor-pointer absolute top-1 right-1"
              onClick={() => setShortLink("")}
            />
            <div className="flex flex-row absolute bottom-3 right-3 gap-3">
              <MdQrCodeScanner
                size={20}
                color="black"
                className="hover:cursor-pointer"
                onClick={() => {
                  setQr(true);
                  Toast.Success("QR generated");
                }}
              />
              <a href={shortLink} target="_blank">
                <FaExternalLinkAlt
                  size={18}
                  color="black"
                  className="hover:cursor-pointer"
                />
              </a>
              <FaClipboard
                size={18}
                color="black"
                className="hover:cursor-pointer"
                onClick={() => handleCopy(shortLink)}
              />
            </div>
          </div>
          <div>
            {qr && (
              <div className="relative" ref={qrRef} onClick={handleQrDownload}>
                <QRCode
                  value={longUrl ? longUrl : "https://shortifyy.vercel.app"}
                  size={112}
                />
                <span className="absolute z-10 top-0 left-0 w-full h-full bg-gray-200 opacity-0 hover:opacity-90 hover:cursor-pointer transition-all duration-300 text-black font-extrabold font-sans flex items-center justify-center">
                  Download ⬇️
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed w-full bottom-0 mb-2 z-[-1]">
        <p className="text-center">
          Built by{" "}
          <a
            href="https://kv3.vercel.app"
            className="text-blue-800"
            target="_blank"
          >
            Karthikeya
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
