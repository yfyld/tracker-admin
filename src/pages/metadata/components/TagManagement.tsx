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
  const [addTagVisible, setAddTagVisible] = React.useState(false);
  const [editTagVisible, setEditTagVisible] = React.useState(false);
  const [curTagInfo, setCurTagInfo] = React.useState<ITagInfo>({
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
          <Button type='link' size='small' onClick={() => handleUpdateMetadata(record)}>
            编辑
          </Button>
          <Button type='link' size='small' onClick={() => handleDeleteMetadata(record)}>
            删除
          </Button>
        </span>
      )
    }
  ];

  const handleUpdateMetadata = (record: ITagInfo) => {
    setCurTagInfo(record);
    setEditTagVisible(true);
  };

  const handleDeleteMetadata = (record: ITagInfo) => {
    confirm({
      title: '提示',
      content: '确定要删除选中的标签',
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
        onClose={setAddTagVisible}
        onSubmit={values => props.doAddTag({ projectId: props.projectId, ...values })}
      ></TagAddModal>
      <TagEditModal
        defaultValue={curTagInfo}
        visible={editTagVisible}
        onClose={setEditTagVisible}
        onSubmit={props.doUpdateTag}
      ></TagEditModal>
      <div className={style.btnBox}>
        <Button onClick={() => setAddTagVisible(true)}>新增标签</Button>
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
