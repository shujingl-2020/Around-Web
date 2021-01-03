import React, {Component} from 'react';
import {Modal, Button, message} from 'antd';
import axios from "axios";
import { PostForm } from "./PostForm";
import { BASE_URL, TOKEN_KEY } from "../constants";

class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false
    }

    showModal = () => {
        this.setState({visible: true})
        console.log('showmodal')
    }

    handleOk = () => {
        this.setState({visible: false})
        // get form data
        // console.log(this.postForm);
        this.postForm.validateFields()
            .then( form => {
                console.log(form);
                // step 1: get info about message and video / image
                const { description, uploadPost } = form;
                // step 2: check file type
                const { type, originFileObj } = uploadPost[0];
                const postType = type.match(/^(image|video)/g)[0];
                // step 3: prepare image / video data and send to server
                let formData = new FormData();
                formData.append("message", description);
                formData.append("media_file", originFileObj);

                const opt = {
                    method: "POST",
                    url: `${BASE_URL}/upload`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                    },
                    data: formData
                };

                axios(opt)
                    .then((res) => {
                        if (res.status === 200) {
                            message.success("The image/video is uploaded!");
                            this.postForm.resetFields();
                            this.handleCancel();
                            this.props.onShowPost(postType);
                            this.setState({ confirmLoading: false });
                        }
                    })
                    .catch((err) => {
                        console.log("Upload image/video failed: ", err.message);
                        message.error("Failed to upload image/video!");
                        this.setState({ confirmLoading: false });
                    });
            })
            .catch(e => {
                console.log('upload error -> ', e.message());
            })

    }


    handleCancel = () => {
        this.setState({visible: false})
    }

    render() {
        const {visible, confirmLoading} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal title="Create New Post" visible={visible} confirmLoading={confirmLoading}
                       onOk={this.handleOk} onCancel={this.handleCancel}>
                    {/*postform is a function component*/}
                    <PostForm ref={(refInstance)=> (this.postForm = refInstance)}/>
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;