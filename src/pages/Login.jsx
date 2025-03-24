import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login', values);
      
      if (response.data.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          username: response.data.username,
          role: response.data.role,
          department: response.data.department
        }));

        message.success('Login successful');

        // Route based on department
        if (response.data.department === 'ppm') {
          navigate('/ppm-quotation/enquiry');
        } else if (response.data.department === 'mntm') {
          navigate('/quotation/charges');
        }
      }
    } catch (error) {
      message.error('Invalid username or password');
    }
  };

  return (
    <div style={{ 
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card 
        title={<h2 style={{ textAlign: 'center' }}>CMTI Quotation Software</h2>}
        style={{ width: 400 }}
      >
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 