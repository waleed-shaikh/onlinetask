import { Col, Form, message, Row } from 'antd';
import React, { useState } from 'react';

const SearchLecture = ({user}) => {
    const [lecture, setLecture] = useState(null);

    const onFinish = async (values) => {
        if(user){
            let data = user.courses.find((course)=>{
                return course.date === values.date
            });
            setLecture(data);
            if(!data){
                message.error('lecture not found');
            }
        }
    }
  return (
    <div className='pb-3 py-2'>
        <h1 className='text-xl py-2'>Search Lectures</h1>
        <Form layout="horizontal" onFinish={onFinish}>
              <Row>
                <Col span={8}>
                  <Form.Item name="date">
                    <input type="date"/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                    <button className="primary-contained-btn" type="submit">
                        Search
                    </button>
                </Col>
              </Row>
        </Form>
        {lecture && <div className="mb-4 bg-secondary pb-3 pt-3">
            <div className="">
                <div className="d-flex justify-start flex-row position-relative">
                    <img className="ms-3 border rounded-2" src={lecture?.courseImage} alt="loading" style={{width: '25%'}}/>
                    <div className="d-flex flex-column justify-center ps-4">
                        <h2 className="">{lecture?.courseName}</h2>
                        <h1 className="text-md">Level : {lecture?.courseLevel}</h1>
                        <h1 className="text-md">Batch : {!lecture.batche? 'morning' : lecture?.batche}</h1>
                        <h1 className="text-md">Description : {lecture?.courseDesc}</h1>
                        <h1 className="text-md">Date : {lecture?.date}</h1>
                    </div>
                    <i className="ri-close-line px-3 position-absolute top-0 end-0" onClick={()=>{setLecture(null);}}></i>  
                </div>
            </div>
          </div>}
    </div>
  )
}

export default SearchLecture
