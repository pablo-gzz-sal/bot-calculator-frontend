import React, { useState } from "react";
import { List, Button } from "antd";
import IHistoryItem from "../models/HistoryItem.ts";

const HistoryList: React.FC<IHistoryItem[]> = ({
  history,
  showHistory,
  onHandleLoadHistory,
}) => {

  return (
    <>
      <Button type="primary" onClick={onHandleLoadHistory}>
        {history.length !== 0 ? "Hide History" : "Show History"}
      </Button>
      {showHistory && (
        <List
          bordered
          dataSource={history}
          renderItem={(item: IHistoryItem) => (
            <List.Item>
              <div>
                <strong>Command:</strong> {item.command} <br />
                <strong>Result:</strong> {item.result} <br />
              </div>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default HistoryList;
