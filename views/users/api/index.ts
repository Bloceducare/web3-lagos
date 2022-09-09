import axios from "axios";

export const getRecords = async (query: string) => {
  const q = query === "all-attendants" ? null : query;
  try {
    const result = await axios.get(
      `/api/participant${!!q ? `?type=${q}` : ""}`
    );
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};



export const getVolunteers = async () => {
  try {
    const result = await axios.get(
      `/api/volunteer`
    );
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};