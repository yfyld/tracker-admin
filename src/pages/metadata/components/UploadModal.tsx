import { Modal, Form, Input, Select, Button, Upload, Icon } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IMetadataAddParam, ITagList, EMetadataType } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddMetadata } from '@/store/actions';
import config from '@/config';

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  uploading: boolean;
}

const UploadModal = (props: Props) => {
  const { getFieldDecorator } = props.form;
  const { Option } = Select;
  const { TextArea } = Input;
  React.useEffect(() => {
    props.form.resetFields();
  }, [props.visible]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }

      props.onClose(false);
    });
  };

  return (
    <Modal onOk={handleSubmit} title='导入元数据' visible={props.visible} onCancel={() => props.onClose(false)}>
      <div>
        <div>下载数据导入模板，在模板中填写元数据信息 完成后建议保存在桌面</div>
        <div>
          <a href='/元数据模板.xlsx' download='导入模板'>
            <Button size='large'>模板下载</Button>
          </a>
        </div>
      </div>
      <div>
        <Upload showUploadList={false} style={{ display: 'inline-block' }} action={config.baseURL + '/common/upload'}>
          <Button size='large' loading={props.uploading}>
            <Icon type='upload' /> 导入元数据
          </Button>
        </Upload>

        <span>导入填写好的Excel文件</span>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({}, dispatch);

const mapStateToProps = (state: IStoreState) => {
  const { uploading } = state.metadata;
  return {
    uploading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(UploadModal));
