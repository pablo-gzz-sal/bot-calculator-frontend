import axios from "axios";

const baseUrl = "http://localhost:4000";

export const sendUserCommand = async (command: string): Promise<string> => {
  const response = await axios.post(`${baseUrl}/calculate`, { command });
  return response.data.result;
};
