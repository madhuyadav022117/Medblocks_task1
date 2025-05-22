import { usePGlite } from "@electric-sql/pglite-react";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  DatePicker,
  Steps,
  message,
  notification,
} from "antd";
import { CREATE_PATIENT_QUERY } from "../utils/queries";
import { nanoid } from "nanoid";
import { useState } from "react";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { Step } = Steps;

const StepRegisterPatientForm = () => {
  const db = usePGlite();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill in all required fields!");
    }
  };

  const prev = () => setCurrentStep(currentStep - 1);

  const onCreate = async () => {
    const values = await form.getFieldsValue(true);
    const id = parseInt(nanoid(10).replace(/\D/g, "").slice(0, 9), 10);
    if (isNaN(id)) {
      message.error("Failed to generate patient ID!");
      return;
    }
    const {
      firstName,
      lastName,
      dob,
      gender,
      email,
      phone,
      address,
      insuranceProvider,
      insuranceId,
      notes,
    } = values;

    const formattedDob = dob.toISOString().split("T")[0];

    try {
      await db.query(CREATE_PATIENT_QUERY, [
        id,
        firstName,
        lastName,
        formattedDob,
        gender,
        email,
        phone,
        address,
        insuranceProvider,
        insuranceId,
        notes,
        new Date().toLocaleDateString(),
      ]);

      api.success({
        message: "Patient added successfully",
      });
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      api.error({
        message: "Failed to add patient",
        description: "Please try again later.",
      });
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }} defaultValue="+91" defaultActiveFirstOption>
        <Select.Option value="+91">+91</Select.Option>
        <Select.Option value="+1">+1 </Select.Option>
        <Select.Option value="+44">+44</Select.Option>
        <Select.Option value="+61">+61</Select.Option>
        <Select.Option value="+81">+81</Select.Option>
        <Select.Option value="+49">+49</Select.Option>
        <Select.Option value="+33">+33</Select.Option>
        <Select.Option value="+971">+971</Select.Option>
      </Select>
    </Form.Item>
  );

  const steps = [
    {
      title: "Personal Info",
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Enter first name!" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Enter last name!" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: true, message: "Enter date of birth!" }]}
              >
                <DatePicker style={{ width: "100%" }} maxDate={dayjs()} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Select gender!" }]}
              >
                <Select>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: "Contact Info",
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Invalid email!" },
                  { required: true, message: "Enter email!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Enter phone number!" }]}
              >
                <Input
                  addonBefore={prefixSelector}
                  type="text"
                  inputMode="numeric"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={10}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Enter address!" }]}
              >
                <Input.TextArea rows={2} maxLength={200} />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: "Medical Info",
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="insuranceProvider" label="Insurance Provider">
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="insuranceId" label="Insurance ID">
                <Input maxLength={20} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="notes" label="Medical Notes">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Layout
          style={{
            backgroundColor: "#fff",
            padding: "2rem",
            maxWidth: 800,
            borderRadius: "8px",
          }}
        >
          <Steps current={currentStep} style={{ marginBottom: 32 }}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Form layout="vertical" form={form} name="register_patient_step_form">
            {steps[currentStep].content}
            <Row justify="space-between" style={{ marginTop: 24 }}>
              {currentStep > 0 && <Button onClick={prev}>Previous</Button>}
              {currentStep < steps.length - 1 ? (
                <Button type="primary" onClick={next}>
                  Next
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" onClick={onCreate}>
                  Register
                </Button>
              )}
            </Row>
          </Form>
        </Layout>
      </div>
    </>
  );
};

export default StepRegisterPatientForm;