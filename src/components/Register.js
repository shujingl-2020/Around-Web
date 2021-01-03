import React, {useState} from 'react';
import {
    Form,
    Button,
    Input,
    message
} from 'antd'
import axios from 'axios';
import {BASE_URL} from "../constants";


function Register(props) {
    const [form] = Form.useForm();

    // when we click on the submit button
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const {username, password} = values;
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signup`,
            data: {
                username: username,
                password: password
            },
            headers: {"content-type": "application/json"}
        };

        axios(opt)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    message.success("Registration Succeeded!");
                    //switch to login page
                    //react router provides two kinds, components & object
                    //we can use object provided by router -> history, can go back and forth
                    props.history.push('/login');
                }
            })
            .catch(e => {
                console.log("register failed", e.message);
                message.error("Registration failed!");
            })

    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            className="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                // rules[0] validation rule
                // rule[1] callback function
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        //在validator 里拿到了input value
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" className="register-btn" htmlType="submit">
                    Register
                </Button>
            </Form.Item>

        </Form>
    );
}

export default Register;