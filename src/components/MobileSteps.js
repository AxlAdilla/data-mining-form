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
            icon={<UserOutlined />}
          />
          <Step
            title="Kuisioner"
            icon={<SolutionOutlined />}
          />
          {/* <Step
            title="Review"
            icon={<FileSearchOutlined />}
          /> */}
          <Step
            title="Selesai"
            icon={<SmileOutlined />}
          />
        </Steps>
      </Panel>
    </Collapse>
  )
}