import React, { useState, useRef } from "react";
import axios from "axios";
import Toast from "./components/Toast";
import { QRCode } from "react-qrcode-logo";
import { API_URL } from "./App";

const Home: React.FC = () => {
  const [long, setLong] = useState("");
  const [short, setShort] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);

  const handleLongLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLong(e.target.value);
    setShort("");
    setQr(false);
  };

  const handleLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!long) {
      Toast.Error("Please Enter a Valid Url");
      return;
    }

    setLoading(true);

    const data = {
      long: long.startsWith("http") ? long : "http://" + long,
      alias: alias || undefined,
    };

    try {
      const res = await axios.post(API_URL + "shortifyy/", { data });
      if (res.data.success) {
        Toast.Success(res.data.message);
        setShort(res.data.short);
      } else {
        Toast.Error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      Toast.Error("Internal Server Error");
    } finally {
      setLoading(false);
    }
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
          Enter your Long link to make your life easier
        </h1>
        <form
          className="w-full mt-5 lg:mt-10 flex flex-col  gap-1"
          onSubmit={handleLinkSubmit}
        >
          <div className="w-full flex flex-col sm:flex-row gap-1">
            <input
              type="text"
              placeholder="Enter your Long Url"
              className="w-full sm:w-3/4 p-3 sm:p-4 md:px-5 md:py-4 text-xl h-full font-sans bg-transparent border-2 border-white/40 focus:border-white focus:border-2 focus:outline-none rounded-sm sm:rounded-r-none sm:rounded-l-md"
              onChange={handleLongLink}
            />
            <input
              type="text"
              placeholder="Enter your Alias"
              className="w-full sm:w-1/4 p-3 sm:p-4 md:px-5 md:py-4 text-xl h-full font-sans bg-transparent border-2 border-white/40 focus:border-white focus:border-2 focus:outline-none rounded-sm sm:rounded-l-none sm:rounded-r-md"
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <button
            className={`w-32 h-12 ml-auto mt-4 py-2 md:py-0 text-xl border-2 border-white/40 justify-center items-center hover:font-bold hover:border-2 hover:border-white active:bg-white active:text-black rounded-sm  flex  ${
              loading ? "bg-white cursor-not-allowed" : "bg-black"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <img
                src="loading.svg"
                className="animate-spin w-6 h-6 text-black"
                alt=""
              />
            ) : (
              "Shortifyy"
            )}
          </button>
        </form>

        {short && (
          <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:gap-10  items-center">
            <div className="h-24 sm:h-32 sm:p-3 sm:px-10 relative flex justify-center items-center bg-white rounded-sm">
              <p className="text-xl sm:text-2xl font-sans px-5 mb-3 text-black">
                {short}
              </p>
              <img
                src="close.svg"
                className="w-6 h-6 text-black cursor-pointer absolute top-1 right-1"
                alt=""
              />
              <div className="flex flex-row absolute bottom-3 right-3 gap-3">
                <img
                  src="qr.svg"
                  className="w-5 h-5 cursor-pointer text-black"
                  onClick={() => {
                    setQr(true);
                    Toast.Success("QR generated");
                  }}
                  alt=""
                />

                <a href={short} target="_blank">
                  <img
                    src="redirect.svg"
                    className="w-5 h-5 text-black cursor-pointer"
                    alt=""
                  />
                </a>
                <img
                  src="copy.svg"
                  className="w-5 h-5 text-black cursor-pointer"
                  onClick={() => handleCopy(short)}
                  alt=""
                />
              </div>
            </div>
            <div>
              {qr && (
                <div
                  className="relative"
                  ref={qrRef}
                  onClick={handleQrDownload}
                >
                  <QRCode
                    value={long ? long : "https://shortifyy.vercel.app"}
                    size={112}
                  />
                  <span className="absolute z-10 top-0 left-0 w-full h-full bg-gray-200 opacity-0 hover:opacity-90 hover:cursor-pointer transition-all duration-300 text-black font-extrabold font-sans flex items-center justify-center">
                    Download ⬇️
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
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
