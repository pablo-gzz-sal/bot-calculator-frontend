import React, { useState, useEffect } from "react";
import ChatInput from "../components/ChatInput";
import HistoryList from "../components/History";
import IHistoryItem from "../models/HistoryItem";
import { sendUserCommand } from "../services/ChatInput.service";
import { getHistory } from "../services/history.service";

const BotCalculator: React.FC = () => {
  const [historyList, setHistoryList] = useState<IHistoryItem[]>([]);

  useEffect(() => {
    getHistory().then(setHistoryList);
  }, []);

  const handleUserCommand = async (command: string) => {
    try {
      const result = await sendUserCommand(command);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Bot Calculator</h1>
      <ChatInput onSend={handleUserCommand} />
      <h2>History List</h2>
      <HistoryList history={historyList} />
    </div>
  );
};

export default BotCalculator;
