import * as React from 'react';
import { Tag, Select, Row, Col, Icon, Input, Dropdown, Divider, Button, Drawer, Menu } from 'antd';
import style from './PathData.module.less';
import { IIndicatorInfo, IChildPageInfo, IFieldInfo, IChildPageData } from '@/api';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Indicator from '@/components/Indicator';
import ChildPage from './ChildPage';
import { IListData } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { EVENT_ATTRS } from '@/constants';
const { Option } = Select;

interface Props {
  childPageData: IChildPageData[];
  indicators: IIndicatorInfo[];
  fieldList?: IListData<IFieldInfo>;
  onChange: (param: IChildPageData[]) => any;
}

const PathData = ({ childPageData, indicators, onChange, fieldList = { list: EVENT_ATTRS } }: Props) => {
  const [drawerVisible, setdrawerVisible] = React.useState(false);
  const [selectedPath, setselectedPath] = React.useState<number[]>([]);
  const [selectedParentPageIndex, setselectedParentPageIndex] = React.useState<number>(null);

  const [selectedParentPage, setselectedParentPage] = React.useState<IChildPageData>(null);

  function handleChange(value: IChildPageData, index: number) {
    let newChildPageData: IChildPageData[] = JSON.parse(JSON.stringify(childPageData));
    newChildPageData[index] = value;
    onChange(newChildPageData);
  }

  const indicatorsMap = indicators.reduce<{ [prop: string]: IIndicatorInfo }>((total, item) => {
    total[item.id] = item;
    return total;
  }, {});

  function handleAdd() {
    const newChildPageData: IChildPageData[] = JSON.parse(JSON.stringify(childPageData));
    newChildPageData.push({
      parentId: null,
      key: uuidv4(),
      children: []
    });
    onChange(newChildPageData);
  }

  function handleRemove(index: number) {
    const newChildPageData: IChildPageData[] = JSON.parse(JSON.stringify(childPageData));
    newChildPageData.splice(index, 1);
    onChange(newChildPageData);
  }

  function handleUpdate(index: number) {
    setdrawerVisible(true);
    setselectedParentPage(childPageData[index]);
    setselectedParentPageIndex(index);
  }

  function hanldClose() {
    setdrawerVisible(false);

    handleChange(
      { ...selectedParentPage, children: selectedParentPage.children.filter(item => item.id) },
      selectedParentPageIndex
    );
  }

  function handleRemovePage(index: number) {
    const data = [...selectedPath];
    data.splice(index, 1);
    setselectedPath(data);
  }

  const handleAddPage = (id: number) => {
    setselectedPath(selectedPath.concat([id]));
  };

  return (
    <div className={style.wrapper}>
      <Drawer
        width={840}
        title='编辑下游页面'
        placement='right'
        closable={false}
        onClose={hanldClose}
        visible={drawerVisible}
      >
        {selectedParentPage && (
          <ChildPage
            parentInfo={indicatorsMap[selectedParentPage.parentId]}
            pageData={selectedParentPage}
            fieldList={fieldList}
            addText='+添加子页面'
            indicators={indicators}
            onChange={setselectedParentPage}
          />
        )}
      </Drawer>

      <div>
        {childPageData.map((item, index) => (
          <div key={item.key}>
            <Row className={style.item} gutter={10}>
              <Col span={2}>
                <div className={style.center}>父级页 {index + 1}</div>
              </Col>
              <Col span={6}>
                <div className={style.fatherPage}>
                  <Select
                    value={item.parentId}
                    onChange={(parentId: string) => handleChange({ ...item, parentId, children: [] }, index)}
                  >
                    {indicators.map(item => (
                      <Option
                        disabled={!!childPageData.find(val => val.parentId === item.id)}
                        key={item.id}
                        value={item.id}
                      >
                        {item.customName || item.metadataName}
                      </Option>
                    ))}
                  </Select>
                  <strong>下游页面:</strong>
                  <span className={style.pathString}>
                    {item.children
                      .filter(info => !!indicatorsMap[info.id])
                      .map(info => indicatorsMap[info.id].customName || indicatorsMap[info.id].metadataName)
                      .join(',')}
                  </span>
                </div>
              </Col>
              <Col span={4}>
                {item.parentId && (
                  <Button size='default' onClick={() => handleUpdate(index)}>
                    编辑下游页面
                  </Button>
                )}
                &nbsp;
                {childPageData.length > 1 && (
                  <Button size='small' onClick={() => handleRemove(index)}>
                    删除
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        ))}
      </div>
      <a onClick={handleAdd}>添加父级页</a>
    </div>
  );
};

export default PathData;
