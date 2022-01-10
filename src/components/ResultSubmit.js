import { Button, Result } from "antd";

export default function ResultSubmit(props) {
  props.form.resetFields();

  return (
    <>
      <Result
        status="success"
        title="Sukses Submit, Terima Kasih !"
      />
    </>
  )
}