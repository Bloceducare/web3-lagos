import axios from "axios";

export const getTotalRecords = async () => {
  try {
    const result = await axios.get("/api/participant/record-counts");

    return result;
  } catch (e) {
    console.log(e," error ocuurred on server");
  }
};
