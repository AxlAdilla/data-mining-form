import { Input, Form, Select, Button, Row, Col } from "antd";
import { useState } from "react";
import DataMahasiswa from "./DataMahasiswa";
import DataUmum from "./DataUmum";

const { Option } = Select;
export default function DataDiriForm(props) {
  const [jobStatus, setJobStatus] = useState(props.form.getFieldValue().status);
  
  const handleChange = (value) => {
    if (value === 'mahasiswa') {
      props.form.resetFields(['other_occupation', 'job'])
    } else {
      props.form.resetFields(['campus_name', 'nim'])
    }
    setJobStatus(value)
  }

  const handleJobStatus = () => {
    switch (jobStatus) {
      case 'mahasiswa':
        return (
          <DataMahasiswa
           form={props.form}
          />
        )
      break;
      case 'umum':
        return (
          <DataUmum
            form={props.form}
          />
        )
      break;
      default:
        return (<></>)
      break;
    }
  }

  return (
    <>
      <Form.Item
        label="Nama"
        name="name"
        rules={[
          {
            required: true,
            message: 'Masukan Nama Lengkap',
          },
        ]}
      >
        <Input placeholder="Nama Lengkap" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Masukan Email',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Pilih Status belum dipilih',
          },
        ]}
      >
        <Select 
          onChange={handleChange}
          placeholder="Pilih status saat ini"
        >
          <Option value="mahasiswa">Mahasiswa</Option>
          <Option value="umum">Umum</Option>
        </Select>
      </Form.Item>  
      {handleJobStatus()}

      <Row>
        {
          props.isMobile ? 
          <Col span={24} style={{marginTop: 10}}>
            <Button type="primary" onClick={() => props.gotoStep(props.current + 1)} block>Next</Button>
          </Col>
          :
          <Col span={6} offset={18}>
            <Button type="primary" onClick={() => props.gotoStep(props.current + 1)} block>Next</Button>
          </Col>
        }
      </Row>
    </>
  )
}