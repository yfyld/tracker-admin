import * as React from 'react';
import style from './ReportDrawerContent.module.less';
import { IPageData } from '@/types';
import { IReportInfo, IReportAddParam, IReportAppendToBoard } from '@/api';
import { List, Input } from 'antd';
import { Link } from 'react-router-dom';
import BoardAppendReportModal from '@/components/BoardAppendReportModal';

const { Search } = Input;

interface Props {
  reportList: IPageData<IReportInfo>;
  onSearch: (param: string) => any;
  onSubmit: (param: IReportAppendToBoard) => any;
  name?: string;
  boardId: number;
}

const ReportDrawerContent = ({ reportList, onSearch, name, onSubmit, boardId }: Props) => {
  const [curReportInfo, setcurReportInfo] = React.useState<IReportInfo>({
    id: null,
    name: '',
    description: '',
    projectId: null,
    type: '',
    data: {},
    dateType: null
  });
  const [appendBoardVisible, setappendBoardVisible] = React.useState(false);

  function handleAdd(info: IReportAddParam) {
    setcurReportInfo(info);
    setappendBoardVisible(true);
  }
  return (
    <div className={style.wrapper}>
      <BoardAppendReportModal
        reportInfo={curReportInfo}
        boardIds={[boardId]}
        visible={appendBoardVisible}
        onClose={setappendBoardVisible}
        onSubmit={onSubmit}
      />
      <Search placeholder='输入报表名称' defaultValue={name} onSearch={onSearch} style={{ width: 200 }} />
      <List
        itemLayout='horizontal'
        dataSource={reportList.list.filter(item => !item.boards.find(item => item.id === boardId))}
        renderItem={item => (
          <List.Item
            actions={[
              <a onClick={() => handleAdd(item)} key='list-loadmore-edit'>
                添加
              </a>
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/project/2/analyse-event/2`}>{item.name}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReportDrawerContent;
