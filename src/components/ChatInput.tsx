import React, { useState } from "react";
import { Input, Button } from "antd";
import IChatInput from "../models/ChatInput";

const ChatInput: React.FC<IChatInput> = ({ onSend }) => {
  const [inputCommand, setInputCommand] = useState("");

  const handleSendAction = () => {
    const trimmedCommand = inputCommand.trim();
    if (trimmedCommand) {
      onSend(trimmedCommand);
      setInputCommand("");
    }
  };

  return (
    <div>
      <Input
        style={{ display: "flex", gap: "10px" }}
        placeholder="Enter a command"
        value={inputCommand}
        onChange={(e) => setInputCommand(e.target.value)}
      />
      <Button type="primary" onClick={handleSendAction}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput
