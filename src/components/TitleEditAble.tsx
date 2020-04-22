import * as React from 'react';
import { Icon, Input } from 'antd';

interface Props {
  value: string;
  onChange: (value: string) => any;
}
const TitleEditAble = ({ value, onChange }: Props) => {
  const [editing, setediting] = React.useState(false);
  const [newValue, setnewValue] = React.useState(value);
  React.useEffect(() => {
    setnewValue(value);
  }, [value]);

  const handleComplete = () => {
    setediting(false);
    if (value === newValue) {
      return;
    }
    onChange(newValue);
  };

  const titleStyle = {
    fontSize: 16,
    lineHeight: '32px',
    margin: 0
  };

  return (
    <div style={{ display: 'inline-block' }}>
      {!editing ? (
        <h2 style={titleStyle}>
          {value}
          &nbsp;
          <Icon type='edit' onClick={() => setediting(true)} />
        </h2>
      ) : (
        <Input
          className='app-no-border-input'
          autoFocus
          style={{ width: 500 }}
          type='text'
          onChange={(e) => setnewValue(e.target.value)}
          value={newValue}
          onBlur={handleComplete}
          onPressEnter={handleComplete}
        />
      )}
    </div>
  );
};
export default TitleEditAble;
