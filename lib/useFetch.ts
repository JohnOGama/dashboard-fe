import { baseUrl } from "@/const/const";
import { useState, useEffect } from "react";

function useFetch(type: string, API_ENDPOINT: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/${type}/${API_ENDPOINT}`);

      if (!response.ok) {
        console.error("Something went wrong in fetching sites");
        return;
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching sites: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    data,
    refetchData: fetchData,
  };
}

export default useFetch;
