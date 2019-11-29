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
  onDelTag: (params: number) => IAction;
  onAddTag: (params: ITagAddParam) => IAction;
  onUpdateTag: (params: ITagUpdateParam) => IAction;
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
          <Button type='link' size='small' onClick={() => handleDeleteMetadata(record.id)}>
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

  const handleDeleteMetadata = (tagId: number) => {
    confirm({
      title: '提示',
      content: '确定要删除选中的标签',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        props.onDelTag(tagId);
      }
    });
  };

  return (
    <div className={style.wrapper}>
      <TagAddModal
        visible={addTagVisible}
        onClose={setAddTagVisible}
        onSubmit={values => props.onAddTag({ projectId: props.projectId, ...values })}
      ></TagAddModal>
      <TagEditModal
        defaultValue={curTagInfo}
        visible={editTagVisible}
        onClose={setEditTagVisible}
        onSubmit={props.onUpdateTag}
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
      onDelTag: (params: number) => doDelTag.request(params),
      onAddTag: (params: ITagAddParam) => doAddTag.request(params),
      onUpdateTag: (params: ITagUpdateParam) => doUpdateTag.request(params)
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

export default connect(mapStateToProps, mapDispatchToProps)(TagManagement);
