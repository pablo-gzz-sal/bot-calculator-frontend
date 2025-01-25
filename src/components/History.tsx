import React from "react";
import { List } from "antd";
import IHistoryItem from "../models/HistoryItem";

const HistoryList: React.FC<IHistoryItem[]> = ({ history }) => {
  <List
    bordered
    dataSource={history}
    renderItem={(item: IHistoryItem) => {
      <List.Item>
        {item.command}: {item.result}
      </List.Item>;
    }}
  />;
};

export default HistoryList