import { FileSearchOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Collapse, Steps } from "antd";

const { Step } = Steps;
const { Panel } = Collapse;
export default function MobileSteps(props) {
  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Panel header="" key="1">
        <Steps {...props.stepsProps}
          type="navigation"
          size="small"
          className="site-navigation-steps "
        >
          <Step
            title="Data Diri"
            status={props.setStepStatus(0)}
            icon={<UserOutlined />}
          />
          <Step
            title="Kuisioner"
            status={props.setStepStatus(1)}
            icon={<SolutionOutlined />}
          />
          <Step
            title="Review"
            status={props.setStepStatus(2)}
            icon={<FileSearchOutlined />}
          />
          <Step
            title="Selesai"
            status={props.setStepStatus(3)}
            icon={<SmileOutlined />}
          />
        </Steps>
      </Panel>
    </Collapse>
  )
}