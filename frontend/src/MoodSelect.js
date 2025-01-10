// MoodSelect.jsx
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MoodSelect = ({ value, onChange }) => {
  return (
    <Select
      placeholder="Select your mood"
      value={value}
      onChange={onChange}
      style={{ width: 200 }}
      // You can handle "required" in the parent by checking if mood is empty
      // but if you want the user not to proceed, you can handle it with validation or checks
      // in the parent component's handleSubmit.
    >
      <Option value="happy">Happy</Option>
      <Option value="sad">Sad</Option>
      <Option value="anxious">Anxious</Option>
      <Option value="motivated">Motivated</Option>
      <Option value="grateful">Grateful</Option>
      <Option value="lonely">Lonely</Option>
      <Option value="stressed">Stressed</Option>
    </Select>
  );
};

export default MoodSelect;
