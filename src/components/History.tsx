import React, { useState } from "react";
import { List, Button } from "antd";
import IHistoryItem from "../models/HistoryItem.ts";
import { formatDate } from "../utils/DateUtils.ts";
import '../styles/History.css'

const HistoryList: React.FC<IHistoryItem[]> = ({
  history,
  showHistory,
  onHandleLoadHistory,
}) => {
  return (
<div className="history-container">
  <Button className="show-button" type="primary" onClick={onHandleLoadHistory}>
    {showHistory ? "Hide History" : "Show History"}
  </Button>
  {showHistory && (
    <List
      bordered
      className="history-list"
      dataSource={history}
      renderItem={(item: IHistoryItem) => (
        <List.Item className="history-item">
          <div className="history-item-content">
            <div>
              <strong>Command:</strong> {item.command}
            </div>
            <div>
              <strong>Result:</strong> {item.result}
            </div>
            <div>
              <strong>Created at:</strong> {formatDate(item.createdAt)}
            </div>
          </div>
        </List.Item>
      )}
    />
  )}
</div>
  );
};

export default HistoryList;
