import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Modal, Form, Input } from 'antd';
import './index.css';
import './index.scss';
import {
  tasks,
  setTasks,
} from '../../actions/websiteActions';


const DeletedTasks = (props) => {

  const [editForm] = Form.useForm();

  const [showModal, setShowModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');


  useEffect(() => {
    const tasks = props.tasks;
    tasks();
  }, [props.tasks])

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const particularTaskDetails = data => {
    if (data) {
      editForm.setFieldsValue({ ...data })
      if ('media' in data) {
        setMediaUrl(data?.media)
      } else {
        setMediaUrl('');
      }
      setShowModal(true);
    }
  }


  return (
    <div className="tasks-div">
      <div>
        <Modal footer={null} title={<div className="add-task">View task</div>} visible={showModal} onOk={handleOk} onCancel={handleCancel}>
          <Row>
            <Col className="ant-col-24" md={24}>
              <Form form={editForm} layout="vertical">
                <Row>
                  <Col className="ant-col-24" md={24}>
                    <Form.Item rules={[{ required: true, message: "Please enter the title" }]} name="title" label="Title">
                      <Input readOnly={true} type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col className="ant-col-24" md={24}>
                    <Form.Item rules={[{ required: true, message: "Please enter the description" }]} name="description" label="Description">
                      <Input.TextArea readOnly={true} autoSize={{ minRows: 4, maxRows: 6 }} type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col className="ant-col-24" md={mediaUrl.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ? 24 : 12}>
                    <Form.Item name="media" label="Media">
                      {
                        mediaUrl ?
                          null
                          :
                          <label style={{ cursor: "not-allowed" }} className="media-upload">
                            <span>No file was uploaded</span>
                            <input disabled={true} accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf" style={{ display: "none" }} type="file" />
                          </label>
                      }
                    </Form.Item>
                  </Col>
                </Row>
                {
                  mediaUrl ?
                    <div>
                      {
                        mediaUrl.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ?
                          <div >
                            <embed style={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px' }} src={mediaUrl} width="100%" height="600px" />
                          </div>
                          :
                          <div className="image-div">
                            <img style={{ objectFit: "contain" }} alt="" height="100%" width="100%" src={mediaUrl} />
                          </div>
                      }
                    </div>
                    :
                    null
                }
              </Form>
            </Col>
          </Row>
        </Modal>
        <div className="tasks-heading">Deleted Tasks</div>
        <div style={{ marginTop: "2rem" }}>
          <div>
            <Row gutter={[30, 10]}>
              <Col className="ant-col-24" md={8}>

              </Col>
              <Col className="ant-col-24" md={8}>
                <div className="status-div">
                  <Row>
                    <Col className="ant-col-24" md={24}>
                      <div className="status-heading" style={{ borderTop: "solid 3px rgb(237, 100, 100)" }}>
                        Deleted
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "2rem" }}>
                    {
                      props?.website?.tasks?.tasks?.filter(f => f.isDeleted === true).map(m => (
                        <div className="tasks">
                          {m.title}
                          <div style={{ width: "20%" }}>
                            <i class="fas fa-eye edit-icon" onClick={() => particularTaskDetails(m)}></i>
                          </div>
                        </div>
                      ))
                    }
                  </Row>
                </div>
              </Col>
              <Col className="ant-col-24" md={8}>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  website: state.website
});

const mapDispatchToProps = {
  tasks,
  setTasks,
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(DeletedTasks));