import { Button, Checkbox, Col, Divider, Form, Radio, Row } from "antd";

export default function Review(props) {
  const handleJobStatus = () => {
    switch (props.form.getFieldValue().status) {
      case 'mahasiswa':
        return (
          <>
            <Row>
              <Col xl={6} lg={6} md={6} sm={24} xs={24}>Asal Kampus</Col>
              <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>{props.form.getFieldValue().campus_name}</Col>
            </Row>
            <Row>
              <Col xl={6} lg={6} md={6} sm={24} xs={24}>NIM</Col>
              <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>{props.form.getFieldValue().nim}</Col>
            </Row>
          </>
        )
      break;
      case 'umum':
        return (
          <>
            <Row>
              <Col xl={6} lg={6} md={6} sm={24} xs={24}>Pekerjaan</Col>
              <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>{props.form.getFieldValue().job}</Col>
            </Row>
          </>
        )
      break;
      default:
        return (<></>)
      break;
    }
  }

  function handleJobLainnya() {
    if (props.form.getFieldValue().job === "lainnya") {
      return (
        <>
          <Row>
            <Col xl={6} lg={6} md={6} sm={24} xs={24}>Nama Pekerjaan</Col>
            <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>{props.form.getFieldValue().other_occupation}</Col>
          </Row>
        </>
      )
    } else {
      return (<></>)
    }
  }

  function handleSentimenKata() {
    let wordsJsx = []
    for (const key in props.dataCasa.words) {
      const word = props.dataCasa.words[key];
      wordsJsx.push(
        <Row key={"word-"+ key} style={{paddingTop:10}}>
          <Col xl={2} lg={2} md={2} sm={0} xs={0} style={{fontSize: 16}}></Col>
          <Col xl={2} lg={2} md={2} sm={24} xs={24} style={{fontSize: 16}}>
            {word}
          </Col>
          <Col xl={20} lg={20} md={20} sm={24} xs={24} style={{textAlign:"center"}}>
            <div className="ant-radio-group ant-radio-group-solid ant-radio-group-large">
              <label className={props.form.getFieldValue().sentimentKata[key] === "POS" ? "ant-radio-button-wrapper ant-radio-button-wrapper-checked" : "ant-radio-button-wrapper" }>
                <span>Positif</span>
              </label>
              <label className={props.form.getFieldValue().sentimentKata[key] === "NEG" ? "ant-radio-button-wrapper ant-radio-button-wrapper-checked" : "ant-radio-button-wrapper" }>
                <span>Negatif</span>
              </label>
              <label className={props.form.getFieldValue().sentimentKata[key] === "NEU" ? "ant-radio-button-wrapper ant-radio-button-wrapper-checked" : "ant-radio-button-wrapper" }>
                <span>Netral</span>
              </label>
            </div>
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

  return (
    <>
      <div>
        <p style={{backgroundColor: "#fff9de", padding: 20, textAlign:"justify"}}>
          Review jawaban anda sebelum mensubmit.
        </p>
      </div>
      <Divider />
      <Row>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>Nama Lengkap</Col>
        <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>{props.form.getFieldValue().name}</Col>
      </Row>
      <Row>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>Email</Col>
        <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>{props.form.getFieldValue().email}</Col>
      </Row>
      <Row>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>Status</Col>
        <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>{props.form.getFieldValue().status}</Col>
      </Row>
      {handleJobStatus()}
      {handleJobLainnya()}
      <Divider />
      <Row style={{justifyContent: 'center'}}>
        <Col>
          <p style={{border: '1px solid black', padding: 10, margin: 10, textAlign:"justify"}}>
            <b>{props.dataCasa.words.join(' ')}</b>
          </p>
        </Col>
      </Row>

      <Row style={{paddingTop:10}}>
        <Col xl={2} lg={2} md={2} sm={24} xs={24}>1</Col>
        <Col offset={2} xl={12} lg={12} md={12} sm={24} xs={24}>Apakah polaritas sentimen yang terkandung pada kalimat diatas ?</Col>
        <Col style={{paddingTop:10}} offset={6} xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="ant-radio-group ant-radio-group-solid ant-radio-group-large">
            <label className={props.form.getFieldValue().sentimentKalimat === "POS" ? "ant-radio-button-wrapper ant-radio-button-wrapper-checked" : "ant-radio-button-wrapper" }>
              <span>Positif</span>
            </label>
            <label className={props.form.getFieldValue().sentimentKalimat === "NEG" ? "ant-radio-button-wrapper ant-radio-button-wrapper-checked" : "ant-radio-button-wrapper" }>
              <span>Negatif</span>
            </label>
            <label className={props.form.getFieldValue().sentimentKalimat === "NEU" ? "ant-radio-button-wrapper ant-radio-button-wrapper-checked" : "ant-radio-button-wrapper" }>
              <span>Netral</span>
            </label>
          </div>
        </Col>
      </Row>
      <Row style={{paddingTop:10}}>
        <Col xl={2} lg={2} md={2} sm={24} xs={24}>2</Col>
        <Col offset={2} xl={20} lg={20} md={20} sm={24} xs={24}>Kata-kata apa saja yang mengandung sentimen ?</Col>
      </Row>
      {handleSentimenKata()}
      <Row style={{paddingTop: 10}}>
        <Col xl={2} lg={2} md={2} sm={24} xs={24}>3</Col>
        <Col offset={2} xl={20} lg={20} md={20} sm={24} xs={24}>Aspek apa yang menjadi sorotan pada kalimat diatas ?</Col>
      </Row>
      <div style={{paddingTop: 20, paddingLeft: 20, display: 'flex', justifyContent: 'center'}}>
        <Checkbox.Group defaultValue={props.form.getFieldValue().aspectSentiment}  style={{ width: '100%' }} >
          <Row>
            <Col span={8}>
              <Checkbox disabled value="FUEL" >Bensin</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox disabled value="MACHINE" >Mesin</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox disabled value="PART" >Sparepart</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox disabled value="PRICE" >Harga</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox disabled value="SERVICE" >Servis</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox disabled value="OTHERS" >Lainnya</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </div>

      <Row style={{paddingTop:20}}>
        {
          props.isMobile ? 
          <>
            <Col
              span={24}
              style={{marginTop: 10}}
            >
              <Button
                onClick={() => props.gotoStep(props.current - 1)} 
                block
              >Previous</Button>
            </Col>
            <Col 
              span={24}
              style={{marginTop: 10}}
            >
              <Button 
                type="primary"
                loading={props.formLoading}
                onClick={() => {
                  props.submit().then(result => {
                    if (result === 'ok') {
                      props.gotoStep(props.current + 1);
                    }
                  });
                }}
                block
              >Submit</Button>
            </Col>
          </>
          :
          <>
            <Col span={6}>
              <Button
                onClick={() => props.gotoStep(props.current - 1)}
                block
              >Previous</Button>
            </Col>
            <Col
              span={6}
              offset={12}
            >
              <Button
                type="primary"
                onClick={() => {
                  props.submit().then(result => {
                    if (result === 'ok') {
                      props.gotoStep(props.current + 1);
                    }
                  });
                }}
                block
              >Submit</Button>
            </Col>
          </>
        }
      </Row>
    </>
  )
}