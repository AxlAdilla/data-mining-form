import { FileSearchOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Steps } from "antd";

const { Step } = Steps;
export default function WebSteps(props) {
  return (
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
  )
}