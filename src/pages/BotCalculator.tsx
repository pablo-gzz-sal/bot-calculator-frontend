import React, { useState, useEffect } from "react";
import ChatInput from "../components/ChatInput.tsx";
import HistoryList from "../components/History.tsx";
import IHistoryItem from "../models/HistoryItem.ts";
import { sendUserCommand } from "../services/ChatInput.service.ts";
import socket from "../services/Socket.service.ts";
import "../styles/BotCalulator.css";

/**
 * Main component for the calculator application that handles socket communication,
 * command processing, and history management.
 */
const BotCalculator: React.FC = () => {
  const [historyList, setHistoryList] = useState<IHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  /**
   * Handles socket events for new history items.
   * Adds new calculations to the history list.
   */
  useEffect(() => {
    const handleHistoryItem = (newItem: IHistoryItem) => {
      setHistoryList((oldList: IHistoryItem[]) => [newItem, ...oldList]);
    };
    socket.on("history_item", handleHistoryItem);

    return () => {
      socket.off("history_item", handleHistoryItem);
    };
  }, []);

  /**
   * Toggles history visibility and loads historical calculations.
   * When showing history: loads and displays past calculations
   * When hiding: clears history list and updates visibility state
   */
  const handleLoadHistory = () => {
    if (!showHistory) {
      socket.emit("load_history");

      const handleLoadedHistory = (historyList: IHistoryItem[]) => {
        setHistoryList(historyList);
      };

      socket.on("history_loaded", handleLoadedHistory);
      setShowHistory(true);
      return () => {
        socket.off("history_loaded", handleLoadedHistory);
      };
    } else {
      setHistoryList([]);
      setShowHistory(false);
    }
  };

  /**
   * Processes user commands and updates history.
   * Emits socket events for history updates
   * Handles error cases
   */
  const handleUserCommand = async (command: string) => {
    try {
      const result = await sendUserCommand(command);
      socket.emit("send_history_item", {
        command,
        result,
        createdAt: new Date(),
      });
      socket.emit("load_history");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <header className="calculator-header">
          <h1 className="calculator-title">Bot Calculator</h1>
          <p className="calculator-subtitle">
            A simple bot for performing calculations
          </p>
        </header>

        <div className="calculator-content">
          <section className="input-section">
            <ChatInput onSend={handleUserCommand} />
          </section>

          <section className="history-section">
            <div className="history-header">
              <h2 className="history-title">History List</h2>
              <div className="history-divider"></div>
            </div>
            <HistoryList
              history={historyList}
              showHistory={showHistory}
              onHandleLoadHistory={handleLoadHistory}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default BotCalculator;
