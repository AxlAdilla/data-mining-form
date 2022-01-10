import { Button, Modal, Checkbox, Col, Divider, Form, Input, Radio, Row } from "antd";
import { useState } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function Kuisioner(props) {
  const [checkedSentimentKalimat, setCheckedSentimentKalimat] = useState("NEU");
  const [sentimentKata, setSentimentKata] = useState(props.form.getFieldValue().sentimentKata);

  function confirm() {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Pastikan data-data yang diisi sudah benar',
      okText: 'Kirim',
      onOk:() => {
        props.submit().then(result => {
          if (result === 'ok') {
            props.gotoStep(props.current + 1);
          }
        });
      },
      cancelText: 'Batal',
    });
  }  

  function handleSentimentKataChange(key, value) {
    let valSentimentKata = props.form.getFieldValue().sentimentKata
    valSentimentKata[key] = value 
    props.form.setFieldsValue({
      sentimentKata : valSentimentKata
    })
    setSentimentKata(valSentimentKata)
  }

  function questionTwo() {
    let wordsJsx = []
    for (const key in props.dataCasa.words) {
      const word = props.dataCasa.words[key];
      wordsJsx.push(
        <Row key={"word-"+ key} style={{paddingTop:5}}>
          <Col xl={2} lg={2} md={2} sm={0} xs={0} style={{fontSize: 16}}></Col>
          <Col xl={2} lg={2} md={2} sm={24} xs={24} style={{fontSize: 16}}>
            {word}
          </Col>
          <Col xl={20} lg={20} md={20} sm={24} xs={24} style={{textAlign:"center"}}>
            <Radio.Group size="large" defaultValue={sentimentKata[key]} buttonStyle="solid">
              <Radio.Button onChange={() => handleSentimentKataChange(key, "POS")} value="POS">Positif</Radio.Button>
              <Radio.Button onChange={() => handleSentimentKataChange(key, "NEG")} value="NEG">Negatif</Radio.Button>
              <Radio.Button onChange={() => handleSentimentKataChange(key, "NEU")} value="NEU">Netral</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      )
    }
    return (
      <>
        {wordsJsx}
      </>
    )
  }

  function showQuestion() {
    return (
      <>
        <Row style={{paddingLeft: 20}}>
          <Col
            span={24}
            style={{ textAlign:"justify" }}
          >
            Perhatikan kalimat berikut :
          </Col>
        </Row>
        <Row style={{justifyContent: 'center'}}>
          <Col>
            <p style={{border: '1px solid black', padding: 10, margin: 10, textAlign:"justify"}}>
              <b>{props.dataCasa.words.join(' ')}</b>
            </p>
          </Col>
        </Row>
        <Row style={{paddingTop: 20, paddingLeft: 20}}>
          <Col span={2}>1</Col>
          <Col span={22}>
            Apakah polaritas sentimen yang terkandung pada kalimat diatas ?
          </Col>
        </Row>
        <Form.Item
          name="sentimentKalimat"
          rules={[
            {
              required: true,
              message: 'Masukan sentimen kalimat',
            },
          ]}
          style={{display: 'flex', justifyContent: 'center'}}
          initialValue="NEU"
        >
          <Radio.Group size="large"  buttonStyle="solid" style={{paddingTop: 20, display: 'flex', justifyContent: 'center'}}>
            <Radio.Button key={"POS"} onChange={()=>setCheckedSentimentKalimat("POS")} value="POS" checked={checkedSentimentKalimat === "POS"}>Positif</Radio.Button>
            <Radio.Button key={"NEG"} onChange={()=>setCheckedSentimentKalimat("NEG")} value="NEG" checked={checkedSentimentKalimat === "NEG"}>Negatif</Radio.Button>
            <Radio.Button key={"NEU"} onChange={()=>setCheckedSentimentKalimat("NEU")} value="NEU" checked={checkedSentimentKalimat === "NEU"}>Netral</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Row style={{paddingTop: 20, paddingLeft: 20}}>
          <Col span={2}>2</Col>
          <Col span={22}>
            Kata-kata apa saja yang mengandung sentimen ?
          </Col>
        </Row>
        <div style={{paddingTop: 20, paddingLeft: 20, display: 'flex', flexDirection:"column", justifyContent: 'center'}}>
          {questionTwo()}
        </div>
        <Row style={{paddingTop: 20, paddingLeft: 20}}>
          <Col span={2}>3</Col>
          <Col span={22}>
            Aspek apa yang menjadi sorotan pada kalimat diatas ?
          </Col>
        </Row>
        <div style={{paddingTop: 20, paddingLeft: 20, display: 'flex', justifyContent: 'center'}}>
          <Form.Item
            name="aspectSentiment"
            rules={[
              {
                required: true,
                message: 'Masukan aspek sentiment',
              },
            ]}
          >
            <Checkbox.Group  style={{ width: '100%' }} >
              <Row>
                <Col span={2}></Col>
                <Col span={6}>
                  <Checkbox value="FUEL">Bensin</Checkbox>
                </Col>
                <Col span={2}></Col>
                <Col span={6}>
                  <Checkbox value="MACHINE">Mesin</Checkbox>
                </Col>
                <Col span={2}></Col>
                <Col span={6}>
                  <Checkbox value="PART">Sparepart</Checkbox>
                </Col>
                <Col span={2}></Col>
                <Col span={6}>
                  <Checkbox value="PRICE">Harga</Checkbox>
                </Col>
                <Col span={2}></Col>
                <Col span={6}>
                  <Checkbox value="SERVICE">Servis</Checkbox>
                </Col>
                <Col span={2}></Col>
                <Col span={6}>
                  <Checkbox value="OTHERS">Lainnya</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <p style={{backgroundColor: "#fff9de", padding: 20, textAlign:"justify"}}>
          Mohon jawab pertanyaan tekait polaritas sentimen dari kalimat dibawah ini.
        </p>
      </div>
      <Divider />
      {showQuestion()}
      <Row>
        {
          props.isMobile ? 
          <>
            <Col span={24} style={{marginTop: 10}}>
              <Button onClick={() => props.gotoStep(props.current - 1)} block>Previous</Button>
            </Col>
            <Col span={24} style={{marginTop: 10}}>
              {/* <Button type="primary" onClick={() => props.gotoStep(props.current + 1)} block>Next</Button> */}
              <Button type="primary" onClick={() => confirm()} block>Next</Button>
            </Col>
          </>
          :
          <>
            <Col span={6}>
              <Button onClick={() => props.gotoStep(props.current - 1)} block>Previous</Button>
            </Col>
            <Col span={6} offset={12}>
              <Button type="primary" onClick={() => confirm()} block>Next</Button>
              {/* <Button type="primary" onClick={() => props.gotoStep(props.current + 1)} block>Next</Button> */}
            </Col>
          </>
        }
      </Row>
    </>
  )
}