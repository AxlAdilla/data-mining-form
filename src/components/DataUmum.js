import { Form, Input, Select } from "antd";
import { useState } from "react";

const { Option } = Select;
export default function DataUmum(props) {
  const [occupation, setOccupation] = useState(props.form.getFieldValue().job);
  
  const handleChange = (value) => {
    setOccupation(value)
    if (value !== 'lainnya') props.form.resetFields(['campus_name', 'nim', 'other_occupation'])
  }

  const handleOccupation = () => {
    if (occupation === 'lainnya') {
      return (
        <Form.Item
          label="Nama Perkerjaan"
          name="other_occupation"
          rules={[
              {
                required: true,
                message: 'Masukan Pekerjaan',
              },
            ]}
            >
          <Input placeholder="Nama Perkerjaan" />
        </Form.Item>
      )
    } else {
      return (<></>)
    }
  }

  return (
    <>
      <Form.Item
        label="Pekerjaan"
        name="job"
        rules={[
            {
              required: true,
              message: 'Masukan Pekerjaan',
            },
          ]}
          >
        <Select 
          onChange={handleChange}
          placeholder="Pilih pekerjaan"
          >
          <Option value="pns">PNS</Option>
          <Option value="karyawan">Karyawan</Option>
          <Option value="freelance">Freelance</Option>
          <Option value="lainnya">Lainnya</Option>
        </Select>
      </Form.Item>
      {handleOccupation()}
    </>
  )
}