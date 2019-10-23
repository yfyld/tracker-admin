import * as React from 'react';
import style from './TagManagement.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IDeleteParam } from '@/types';

import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Modal } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import TagAddModal from './TagAddModal';
import { doDelTag, doUpdateTag, doAddTag } from '@/store/actions';
import { ITagAddParam, ITagUpdateParam, ITagList, ITagInfo } from '@/api';
import TagEditModal from './TagEditModal';

const { confirm } = Modal;

interface Props {
  doDelTag: (params: IDeleteParam) => IAction;
  doAddTag: (params: ITagAddParam) => IAction;
  doUpdateTag: (params: ITagUpdateParam) => IAction;
  projectId: number;
  tagList: ITagList;
}

const TagManagement = (props: Props) => {
  const [addTagVisible, setaddTagVisible] = React.useState(false);
  const [editTagVisible, seteditTagVisible] = React.useState(false);
  const [curTagInfo, setcurTagInfo] = React.useState<ITagInfo>({
    id: null,
    name: '',
    description: '',
    projectId: null
  });
  const columns: ColumnProps<any>[] = [
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name'
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <Button size='small' onClick={() => handleUpdateMetadata(record)}>
            编辑
          </Button>
          <Button size='small' onClick={() => handleDeleteMetadata(record)}>
            删除
          </Button>
        </span>
      )
    }
  ];

  const handleUpdateMetadata = (record: ITagInfo) => {
    setcurTagInfo(record);
    seteditTagVisible(true);
  };

  const handleDeleteMetadata = (record: ITagInfo) => {
    confirm({
      title: '提示',
      content: '确定要删除选中的元数据',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        props.doDelTag(record);
      }
    });
  };

  return (
    <div className={style.wrapper}>
      <TagAddModal
        visible={addTagVisible}
        onClose={setaddTagVisible}
        onSubmit={values => props.doAddTag({ projectId: props.projectId, ...values })}
      ></TagAddModal>
      <TagEditModal
        defaultValue={curTagInfo}
        visible={editTagVisible}
        onClose={seteditTagVisible}
        onSubmit={props.doUpdateTag}
      ></TagEditModal>
      <div className={style.btnBox}>
        <Button onClick={() => setaddTagVisible(true)}>新增标签</Button>
      </div>
      <Table rowKey='id' pagination={false} columns={columns} dataSource={props.tagList.list} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doDelTag: (params: IDeleteParam) => doDelTag.request(params),
      doAddTag: (params: ITagAddParam) => doAddTag.request(params),
      doUpdateTag: (params: ITagUpdateParam) => doUpdateTag.request(params)
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  const tagList = state.metadata.tagList;
  return {
    projectId,
    tagList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagManagement);
