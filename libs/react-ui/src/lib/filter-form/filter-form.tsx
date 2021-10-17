import './filter-form.module.scss';
import 'antd/dist/antd.css';

import { Input, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;


function handleChange(value: any) {
  console.log(`selected ${value}`);
}




/* eslint-disable-next-line */
export interface FilterFormProps {}

export function FilterForm(props: FilterFormProps) {
  return (
    <div>
      <Select defaultValue="teamName" style={{ width: 120 }} onChange={handleChange}>
      <Option value="teamName">team name</Option>
    </Select>
    <Select defaultValue="equal" style={{ width: 120 }}>
      <Option value="equal">Equal</Option>
      <Option value="contains">Contains</Option>
    </Select>
    <Input  style={{ width: 120 }} placeholder="search" />
    <CheckOutlined />
    <CloseOutlined />
    </div>
  );
}

export default FilterForm;
