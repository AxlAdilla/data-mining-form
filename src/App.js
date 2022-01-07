import './App.css';
import FirebaseApp from './firebase/FirebaseApp'
import { getDatabase, ref, child, get, set} from "firebase/database";
import { Divider, Input, Button, Form, Result, Select, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStepsForm } from 'sunflower-antd';
import WebSteps from './components/WebSteps';
import MobileSteps from './components/MobileSteps';
import DataDiriForm from './components/DataDiriForm';
import ResultSubmit from './components/ResultSubmit';
import Review from './components/Review';
import Kuisioner from './components/Kuisioiner';
import lodash from 'lodash'; 


const db = getDatabase(FirebaseApp)
const dbRef = ref(db)

const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

function dec2hex (dec) {
  return dec.toString(16).padStart(2, "0")
}

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj
}

function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [dataCasa, setDataCasa] = useState([]);

  const {
    form,
    current,
    gotoStep,
    stepsProps,
    formProps,
    submit,
    formLoading
  } = useStepsForm({
    async submit(values) {
      await set(ref(db, 'attendances/'+ generateId()), clean(values))
      await new Promise(r => setTimeout(r, 1000));
      return 'ok';
    },
    total: 4,
  });
  
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    get(child(dbRef, '/dataset')).then((snapshot) => {
      if (snapshot.exists()) {
        const sampleCasaNode = lodash.sample(snapshot.val()) 
        form.setFieldsValue({
          sentimentKata : Array(sampleCasaNode.words.length).fill("NEU"),
          datasetCasaId : sampleCasaNode.id
        })

        setDataCasa(sampleCasaNode)
      } else {
        console.log("No data available");
      }
    })

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;
  const formList = [
    <DataDiriForm
      tailLayout={tailLayout}
      gotoStep={gotoStep}
      current={current} 
      isMobile={isMobile}
      form={form}
    />,
    <Kuisioner
      tailLayout={tailLayout}
      gotoStep={gotoStep}
      current={current} 
      isMobile={isMobile}
      form={form}
      dataCasa={dataCasa}
    />,
    <Review
      tailLayout={tailLayout}
      gotoStep={gotoStep}
      current={current}
      formLoading={formLoading}
      submit={submit}
      isMobile={isMobile}
      form={form}
      dataCasa={dataCasa}
    />,
    <ResultSubmit
      gotoStep={gotoStep}
      form={form}
      isMobile={isMobile}
    />
  ];

  const setStepStatus = (stepIndex) => {
    if (stepIndex === current) {
      return "process"
    } else if (stepIndex < current) {
      return "finish"
    } else {
      return "wait"
    }
  }

  return (
      <>
        <div>
        {
          isMobile ? <MobileSteps
          stepsProps={stepsProps}
          setStepStatus={setStepStatus}
          /> : <WebSteps
          stepsProps={stepsProps}
          setStepStatus={setStepStatus}
          />
        }
        </div>
        
        <Row style={{justifyContent: 'center', backgroundColor: "#f0f0f0", minHeight: "100vh"}}>
          <Col span={18} style={{backgroundColor: "white"}}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <Form {...layout} {...formProps} style={{ padding: 10, width: 600 }}>
                {formList[current]}
              </Form>
            </div>
          </Col>
        </Row>
      </>
    );
}

export default App;
