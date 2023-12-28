import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization:
              "Bearer" +
              (import.meta.env.VITE_APP_STRAPI_TOKEN ||
                import.meta.env.VITE_APP_STRAPI_TOKEN_LOCAL),
          },
        });

        setData(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
