import React from "react";
import { List } from "antd";
import IHistoryList from "../models/HistoryList";
import IHistoryItem from "../models/HistoryItem";

const HistoryList: React.FC<IHistoryList> = ({ history }) => {
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