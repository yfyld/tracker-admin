import * as React from 'react';
import style from './ReportDrawerContent.module.less';
import { IPageData } from '@/types';
import { IReportInfo } from '@/api';
import { List, Input } from 'antd';

const { Search } = Input;

interface Props {
  reportList: IPageData<IReportInfo>;
  onSearch: (param: string) => any;
  name?: string;
}

const ReportDrawerContent = ({ reportList, onSearch, name }: Props) => {
  return (
    <div className={style.wrapper}>
      <Search placeholder='输入报表名称' defaultValue={name} onSearch={onSearch} style={{ width: 200 }} />
      <List
        itemLayout='horizontal'
        dataSource={reportList.list.filter(item => !item.boardId)}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.description} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReportDrawerContent;
