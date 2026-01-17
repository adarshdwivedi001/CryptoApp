import React, { useState } from "react";
import { Row, Col, Form, Input, Button, notification, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const SignupForm = ({ onComplete }) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  const sendOtp = (values) => {
    setMobile(values.mobile);
    const otp = generateOtp();
    sessionStorage.setItem("mock_otp", otp);
    sessionStorage.setItem("pending_user", JSON.stringify(values));
    setStep(2);
    notification.success({
      message: "OTP Sent",
      description: `OTP: ${otp}`,
      duration: 5,
    });
  };

  const verifyOtp = ({ otp }) => {
    const sent = sessionStorage.getItem("mock_otp");
    if (otp === sent) {
      const user = JSON.parse(sessionStorage.getItem("pending_user") || "{}");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ ...user, createdAt: new Date().toISOString() });
      localStorage.setItem("users", JSON.stringify(users));
      // mark user as logged in (mock session) so ProtectedRoute allows access
      const currentUser = {
        mobile: user.mobile,
        email: user.email,
        firstName: user.firstName,
        loggedAt: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      sessionStorage.removeItem("mock_otp");
      sessionStorage.removeItem("pending_user");
      notification.success({ message: "Signup successful" });
      form.resetFields();
      setStep(1);
      onComplete({ mobile: user.mobile, email: user.email });
    } else {
      notification.error({ message: "Invalid OTP" });
    }
  };

  const resend = () => {
    const otp = generateOtp();
    sessionStorage.setItem("mock_otp", otp);
    notification.info({
      message: "OTP Resent",
      description: `OTP: ${otp}`,
    });
  };

  return (
    <div className="auth-container">
      <Title level={3} style={{ textAlign: "center" }}>
        Sign Up
      </Title>

      {step === 1 && (
        <Form form={form} layout="vertical" onFinish={sendOtp}>
          <Form.Item
            name="First name"
            label="First name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Last name"
            label="Last name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Mobile"
            label="Mobile"
            rules={[{ required: true }, { pattern: /^\d{6,15}$/ }]}
          >
            <Input onChange={(e) => setMobile(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      )}

      {step === 2 && (
        <Form layout="vertical" onFinish={verifyOtp}>
          <Form.Item label={`OTP sent to ${mobile}`}>
            <Input value={mobile} disabled />
          </Form.Item>
          <Form.Item name="otp" label="Enter OTP" rules={[{ required: true }]}>
            <Input maxLength={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Verify & Complete
            </Button>
          </Form.Item>
          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={resend}>Resend OTP</Button>
            <Button
              onClick={() => {
                setStep(1);
                sessionStorage.removeItem("mock_otp");
                sessionStorage.removeItem("pending_user");
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

const Auth = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // after signup success navigate to home
    navigate("/", { replace: true });
  };

  return (
    <Row justify="center" style={{ padding: 24 }}>
      <Col xs={24} sm={20} md={14} lg={10}>
        <SignupForm onComplete={handleComplete} />
      </Col>
    </Row>
  );
};

export default Auth;
