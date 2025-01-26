import React, { useState } from "react";
import { Input, Button } from "antd";
import IChatInput from "../models/ChatInput";

const ChatInput: React.FC<IChatInput> = ({ onSend }) => {
  const [inputCommand, setInputCommand] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isValidInputCommand = (command: string) => {
    const mathRegex = /^[0-9+\-*/().^\s]+$/;

    return mathRegex.test(command);
  };

  const handleSendAction = () => {
    const trimmedCommand = inputCommand.trim();
    const lastChar = trimmedCommand.slice(-1);
    const operators = ["+", "-", "*", "/"];

    if (!trimmedCommand) {
      setError("Please enter a mathematical expression");
      return;
    }

    if (operators.includes(lastChar)) {
      setError(
        "Invalid mathematical expression. Expression cannot end with an operator."
      );
      return;
    }

    if (!isValidInputCommand(trimmedCommand)) {
      setError("Invalid mathematical expression. Please try again.");
      return;
    }

    setError(null);
    onSend(trimmedCommand);
    setInputCommand("");
  };

  return (
    <div>
      <Input
        style={{ display: "flex", gap: "10px" }}
        placeholder="Enter a command"
        value={inputCommand}
        onChange={(e) => setInputCommand(e.target.value)}
      />
      {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
      <Button type="primary" onClick={handleSendAction}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
