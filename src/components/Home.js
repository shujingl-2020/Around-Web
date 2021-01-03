import React, {useState, useEffect} from 'react';
import SearchBar from "./SearchBar";
import {Tabs, message, Row, Col} from 'antd';
import {SEARCH_KEY, BASE_URL, TOKEN_KEY} from "../constants";
import axios from 'axios';
import PhotoGallery from "./PhotoGallery";

const {TabPane} = Tabs;

function Home(props) {
    const [activeTab, setActiveTab] = useState('image');
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ''
    })

    const [post, setPost] = useState([]);


    // fetch data during updating state
    useEffect(() => {
        console.log('in effect', searchOption);
        fetchPost(searchOption);
    }, [searchOption]);

    const fetchPost = option => {
        const {type, keyword} = option;
        let url = '';

        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.keyword) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        }

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    //after did mount we have post data
                    setPost(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            });
    }

    const renderPost = type => {
        // case 1: post empty
        if (!post || post.length === 0) {
            return <div> no data </div>
        }
        // case 2: type === image -> image
        // case 3: type === video -> video
        if (type === 'image') {
            // filter
            // map
            // 返回arr, 有可能有image 和 video 两种
            const imageArr = post.filter((item) => item.type === "image")
                .map((image) => {
                    return {
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });

            return <PhotoGallery images={imageArr}/>;
        } else if (type === 'video') {
            return (
                <Row>
                    {
                        post.filter(item => item.type === 'video')
                            .map(item => (
                                //key is used by virtual dom
                                <Col span={8} key={item.url}>
                                    <video src={item.url}
                                           control={true}
                                           className='video-block'/>
                                    <p> {item.user} : {item.message} </p>
                                </Col>

                            ))
                    }
                </Row>
            )
        }
    }

    return (
        <div className='home'>
            <SearchBar/>
            <div className='display'>
                <Tabs defaultActiveKey="image" onChange={key => setActiveTab(key)}>
                    <TabPane tab="Image" key="image">
                        {
                            renderPost('image')
                        }
                    </TabPane>
                    <TabPane tab="Video" key="video">
                        {
                            renderPost('video')
                        }
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Home;