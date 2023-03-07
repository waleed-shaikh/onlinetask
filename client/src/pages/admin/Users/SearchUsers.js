import { Col, Form, Input, Row } from 'antd';
import { message  } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {searchUserData} from "../../../apicalls/users";
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

const SearchUsers = ({setSearchedUser, refreshData}) => {
    const dispatch = useDispatch();
    const [searchUser, setSearchUser] = useState(null);

    const onFinish = async (values) => {
        try {
          dispatch(ShowLoading());
          let response = await searchUserData({
              name: values.name
            });
          if (response.success) {
            setSearchUser(response.data);
            setSearchedUser(response.data)
            message.success(response.message);
          } else {
            setSearchedUser([])
            message.error(response.message);
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
    }
      
    const getAllUser = ()=>{
      refreshData();
      setSearchedUser(null);
    }
    useEffect(() => {
        
    }, [])
    
  return (
    <>
    <div className='d-flex justify-between align-items-center'>
      <div className='pb-3 py-2 w-75'>
          <h1 className='text-xl py-2'>Search User</h1>
          <Form layout="horizontal" onFinish={onFinish}>
                <Row className='d-flex' gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item name='name' rules={[
                      {
                        required: true,
                        message: 'Please input course name!',
                      },
                    ]}>
                    <Input list='users'/>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                      <button className="primary-contained-btn" type="submit">
                          Search
                      </button>
                  </Col>
                </Row>
          </Form>
      </div>
      {(searchUser || !searchUser) &&
      <div>
          <button className="primary-contained-btn" onClick={getAllUser}>
                Get All Users
          </button>             
      </div>
      }
    </div>
    </>
  )
}

export default SearchUsers
