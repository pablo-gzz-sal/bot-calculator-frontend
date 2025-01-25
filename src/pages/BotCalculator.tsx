import React, { useState, useEffect } from "react";
import ChatInput from "../components/ChatInput.tsx";
import HistoryList from "../components/History.tsx";
import IHistoryItem from "../models/HistoryItem.ts";
import { sendUserCommand } from "../services/ChatInput.service.ts";
import { getHistory } from "../services/history.service.ts";
import socket from "../services/Socket.service.ts";
import '../styles/BotCalulator.css'

const BotCalculator: React.FC = () => {
  const [historyList, setHistoryList] = useState<IHistoryItem[]>([]);

  useEffect(() => {
    const handleHistoryLoaded = (history: IHistoryItem[]) => {
      setHistoryList(history);
    };
    socket.on("history_loaded", handleHistoryLoaded);

    const handleHistoryItem = (newItem: IHistoryItem) => {
      setHistoryList((oldList: IHistoryItem[]) => [newItem, ...oldList]);
    };
    socket.on("history_item", handleHistoryItem);

    return () => {
      socket.off("history_loaded", handleHistoryLoaded);
      socket.off("history_item", handleHistoryItem);
    };
  }, []);

  useEffect(() => {
    socket.emit("load_history");
    console.log("loading history");
  }, []);

  const handleUserCommand = async (command: string) => {
    try {
      const result = await sendUserCommand(command);
      socket.emit("send_history_item", {
        command,
        result,
        createdAt: new Date(),
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Bot Calculator</h1>
        <p>A simple bot for performing calculations</p>
      </header>

      <section className="chat-input">
        <ChatInput onSend={handleUserCommand} />
      </section>

      <section className="history">
        <h2>History List</h2>
        <HistoryList history={historyList} />
      </section>
    </div>
  );
};

export default BotCalculator;
