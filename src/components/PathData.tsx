import * as React from 'react';
import { Tag, Select, Row, Col, Icon, Input, Dropdown, Divider, Button } from 'antd';
import style from './PathData.module.less';
import { IIndicatorInfo, IPathDataInfo } from '@/api';

const { Option } = Select;

interface Props {
  pathsData: IPathDataInfo[];
  indicators: IIndicatorInfo[];
  onChange: (param: IPathDataInfo[]) => any;
}

const PathData = ({ pathsData, indicators, onChange }: Props) => {
  function handleChange(value: number[], index: number) {
    let newPathDatas: IPathDataInfo[] = JSON.parse(JSON.stringify(pathsData));
    newPathDatas[index].paths = value;
    onChange(newPathDatas);
  }

  const indicatorsMap = indicators.reduce<{ [prop: string]: IIndicatorInfo }>((total, item) => {
    total[item.id] = item;
    return total;
  }, {});

  function handleAdd() {
    const newPathDatas: IPathDataInfo[] = JSON.parse(JSON.stringify(pathsData));
    newPathDatas.push({
      id: Date.now(),
      paths: [null]
    });
    onChange(newPathDatas);
  }

  function handleRemove(index: number) {
    const newPathDatas: IPathDataInfo[] = JSON.parse(JSON.stringify(pathsData));
    newPathDatas.splice(index, 1);
    onChange(newPathDatas);
  }

  return (
    <div className={style.wrapper}>
      <div>
        {pathsData.map((item, index) => (
          <div key={item.id}>
            <Row className={style.item} gutter={10}>
              <Col span={1}>
                <div className={style.center}>路径 {index + 1}</div>
              </Col>
              <Col span={16}>
                {/* <Select value={item.paths} onChange={() => handleChange(item.paths, index)}>
                  {indicators.map(indicator => (
                    <Option value={indicator.id} key={indicator.id}>
                      {indicator.customName || indicator.metadataName}
                    </Option>
                  ))}
                </Select> */}
                <div>
                  {item.paths
                    .filter(pageId => !!indicatorsMap[pageId])
                    .map(pageId => indicatorsMap[pageId].customName || indicatorsMap[pageId].metadataName)
                    .join('>')}
                </div>
              </Col>
              <Col span={4}>
                <Button>编辑</Button>
                {pathsData.length > 1 && <Button>删除</Button>}
              </Col>
            </Row>
          </div>
        ))}
      </div>
      <a onClick={handleAdd}>添加路径</a>
    </div>
  );
};

export default PathData;
