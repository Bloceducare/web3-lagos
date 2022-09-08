import { useState, useEffect } from "react";
import { getRecords } from "../api";

const initData = {
  data: [],
  loading: false,
  error: false,
};
const useGetRecords = (q: string) => {
  const [data, setData] = useState(initData);

  const fetchData = async () => {
    setData((prev) => ({ ...prev, data: [], loading: true, error: false }));
    try {
      const data = await getRecords(q);
      const mapped = data.map((items: any, index: number) => ({
        ...items,
        SN: index + 1,
      }));
      setData((prev) => ({
        ...prev,
        loading: false,
        data: mapped,
      }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: true,
      }));
    }
  };
  useEffect(() => {
    fetchData();
  }, [q]);

  return {
    data,
    fetchData,
  };
};

export default useGetRecords;
