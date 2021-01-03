import React, {useState} from 'react';
import {Input, Radio} from 'antd';
import {SEARCH_KEY} from "../constants";

const {Search} = Input;

function SearchBar(props) {
    const onSearch = value => console.log(value);
    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState(null);

    const changeSearchType = e => {
        // e is event object
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

            <p className="error-msg">
                {error}
            </p>

            <Radio.Group onChange={changeSearchType} value={searchType}>
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;