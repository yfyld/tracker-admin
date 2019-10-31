import * as React from 'react';
import style from './ReportDrawerContent.module.less';
import { IPageData } from '@/types';
import { IReportInfo } from '@/api';
import { List, Input } from 'antd';

const { Search } = Input;

interface Props {
  reportList: IPageData<IReportInfo>;
}

const ReportDrawerContent = ({ reportList }: Props) => {
  return (
    <div className={style.wrapper}>
      <Search placeholder='输入报表名称' onSearch={value => console.log(value)} style={{ width: 200 }} />
      <List
        itemLayout='horizontal'
        dataSource={reportList.list}
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
