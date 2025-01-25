import axios from "axios";
import IHistoryItem from "../models/HistoryItem";

const baseUrl = "http://localhost:4000/";

export const getHistory = async (): Promise<IHistoryItem[]> => {
  const response = await axios.post(`${baseUrl}/history`);
  return response.data.history;
};
