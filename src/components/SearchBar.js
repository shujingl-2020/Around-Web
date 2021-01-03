import React, {useState} from 'react';
import {Input, Radio} from 'antd';

const {Search} = Input;

function SearchBar(props) {
    const onSearch = value => console.log(value);
    const [searchType, setSearchType] = useState("all");

    const changeSearchType = e => {
        const searchType = e.target.value;
        console.log(searchType);
        setSearchType(searchType);
    }

    return (
        <div className="search-bar">
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />

            <Radio.Group onChange={changeSearchType} value={searchType}>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;