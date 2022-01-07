import { Form, Input } from "antd";

export default function DataMahasiswa(props) {
  return (
    <>
      <Form.Item
        label="Asal Kampus"
        name="campus_name"
        rules={[
            {
              required: true,
              message: 'Masukan Asal Kampus',
            },
          ]}
          >
        <Input placeholder="Asal Kampus" />
      </Form.Item>
      <Form.Item
        label="NIM"
        name="nim"
        rules={[
            {
              required: true,
              message: 'Masukan Nomor Induk Mahasiswa',
            },
          ]}
          >
        <Input placeholder="Nomor Induk Mahasiswa" />
      </Form.Item>
    </>
  )
}