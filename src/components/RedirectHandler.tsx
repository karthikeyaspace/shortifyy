import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";

const RedirectHandler: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { alias } = useParams<{ alias: string }>();

  useEffect(() => {
    if (alias) {
      const redirectToLongUrl = async () => {
        try {
          const res = await axios.get(API_URL + "shortifyy/" + alias);

          if (res.data.success) {
            window.location.href = res.data.long;
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
        }
      };
      redirectToLongUrl();
    }
  }, [alias]);

  return (
    <div className="z-50 absolute w-screen h-screen bg-black">
      <div className="flex justify-center items-center h-full">
        {loading ? (
          <div className="text-white text-2xl">Loading...</div>
        ) : (
          <div className="text-white text-2xl">URL not found</div>
        )}
      </div>
    </div>
  );
};

export default RedirectHandler;
