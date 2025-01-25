import React from "react";
import { List } from "antd";
import IHistoryItem from "../models/HistoryItem.ts";

const HistoryList: React.FC<IHistoryItem[]> = ({ history }) => {
  console.log(history);

  return (
    <>
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
    </>
  );
};

export default HistoryList;
