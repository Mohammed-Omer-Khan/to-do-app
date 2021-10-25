import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Modal, Form, Input, Button, Checkbox, Popconfirm } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import './index.css';
import './index.scss';
import {
  createTask,
  setCreateTask,
  tasks,
  setTasks,
  particularTask,
  setParticularTask,
  changeStatus,
  setChangeStatus,
  editTask,
  setEditTask,
  deleteTask,
  setDeleteTask
} from '../../actions/websiteActions';


const Tasks = (props) => {

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaFile, setMediaFile] = useState();
  const [status, setStatus] = useState();
  const [taskId, setTaskId] = useState();
  const [checkValue, setCheckValue] = useState(null);


  useEffect(() => {
    const tasks = props.tasks;
    tasks();
  }, [props.tasks])

  const handleOk = () => {
    setIsModalVisible(false);
    setShowModal(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowModal(false);
  };

  const uploadMedia = e => {
    const file = e.target.files[0];
    if (!file?.name.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
      alert("Only JPG, JPEG, PNG, GIF and PDF files are allowed");
      return (false);
    }
    setMediaUrl(URL.createObjectURL(file));
    setMediaFile(file);
  }

  const onFinish = values => {
    if (mediaFile) {
      values.media = mediaFile;
    } else {
      delete values.media;
    }
    const createTask = props.createTask;
    createTask(values);
    form.resetFields();
    setIsModalVisible(false);
    props.tasks();
  }

  const particularTaskDetails = data => {
    setCheckValue(null)
    setStatus(data.status);
    setTaskId(data._id);
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

  const onEdit = _ => {
    const data = editForm.getFieldsValue();
    data.taskId = taskId;
    if (mediaFile) {
      data.media = mediaFile;
    } else {
      delete data.media;
    }
    const editTask = props.editTask;
    editTask(data);
    setShowModal(false);
    props.tasks();
  }

  const changeStatuss = status => {
    const changeStatus = props.changeStatus;
    changeStatus({ taskId: taskId, status: status });
    setTimeout(() => {
      setShowModal(false);
      props.tasks();
    }, 200)
  }

  const confirm = (e) => {
    console.log(e);
    const deleteTask = props.deleteTask;
    deleteTask({ taskId: taskId });
    props.tasks();
  }

  const cancel = (e) => {
    console.log(e);
  }

  const onDragStart = (e, id) => {
    console.log('dragstart:', id);
    e.dataTransfer.setData("id", id);
  }

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData("id");
    props?.website?.tasks?.tasks?.filter((task) => {
      if (task._id === id) {
        props.changeStatus({ taskId: id, status: status });
      }
      return 'div';
    });
    props.tasks();
  }

  const highlightDropArea = (id, isTrue) => {
    if (id === 'in-progress') {
      isTrue === true ? document.getElementById(id).style.backgroundColor = "#86aef7" :
        document.getElementById(id).style.backgroundColor = "";
    } else {
      isTrue === true ? document.getElementById(id).style.backgroundColor = "#62bc70" :
        document.getElementById(id).style.backgroundColor = "";
    }
  }

  return (
    <div className="tasks-div">
      <div>
        <Modal footer={null} title={<div className="add-task">Add new task</div>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Row>
            <Col className="ant-col-24" md={24}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row>
                  <Col className="ant-col-24" md={24}>
                    <Form.Item rules={[{ required: true, message: "Please enter the title" }]} name="title" label="Title">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col className="ant-col-24" md={24}>
                    <Form.Item rules={[{ required: true, message: "Please enter the description" }]} name="description" label="Description">
                      <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "left" }} className="ant-col-24" md={mediaFile?.name.match(/\.(pdf)$/) ? 24 : 8}>
                    <Form.Item name="media" label="Media">
                      <label className="media-upload">
                        <span>Choose a file</span>
                        <input accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf" style={{ display: "none" }} type="file" onChange={uploadMedia} />
                      </label>
                    </Form.Item>
                  </Col>
                </Row>
                {
                  mediaUrl ?
                    <div>
                      {
                        mediaFile?.name.match(/\.(pdf)$/) ?
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
                <Row style={{ marginTop: "2rem" }}>
                  <Col style={{ display: "flex", justifyContent: "center" }} className="ant-col-24" md={24}>
                    <Button className="create-task-btn" htmlType="submit">Create Task</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Modal>
        <Modal footer={null} title={<div className="add-task">{status === 'Completed' ? 'View' : 'Edit'} task</div>} visible={showModal} onOk={handleOk} onCancel={handleCancel}>
          <Row style={{ marginBottom: "2rem" }}>
            <Col className="ant-col-24" md={24}>
              {
                status === 'Open' ?
                  <div className="open-check">
                    <span className="status-change">
                      <Checkbox disabled={true}><span style={{ color: "#000", fontSize: "15px" }}>Open</span></Checkbox>
                    </span>
                    <span><DoubleRightOutlined style={{ marginRight: "0.5rem" }} /></span>
                    <span className="status-change">
                      <Checkbox checked={checkValue} onChange={() => { setCheckValue(true); changeStatuss('InProgress') }} ><span style={{ color: "#000", fontSize: "15px" }}>In Progress</span></Checkbox>
                    </span>
                  </div>
                  :
                  status === 'InProgress' ?
                    <div className="progress-check">
                      <span className="status-change">
                        <Checkbox disabled={true}><span style={{ color: "#000", fontSize: "15px" }}>In Progress</span></Checkbox>
                      </span>
                      <span><DoubleRightOutlined style={{ marginRight: "0.5rem" }} /></span>
                      <span className="status-change">
                        <Checkbox checked={checkValue} onChange={() => { setCheckValue(true); changeStatuss('Completed') }}><span style={{ color: "#000", fontSize: "15px" }}>Completed</span></Checkbox>
                      </span>
                    </div>
                    :
                    <div className="completed-check">
                      <span className="status-change">
                        <Checkbox disabled={true}><span style={{ color: "#000", fontSize: "15px" }}>Completed</span></Checkbox>
                      </span>
                    </div>
              }
            </Col>
          </Row>
          <Row>
            <Col className="ant-col-24" md={24}>
              <Form form={editForm} layout="vertical" onFinish={onEdit}>
                <Row>
                  <Col className="ant-col-24" md={24}>
                    <Form.Item rules={[{ required: true, message: "Please enter the title" }]} name="title" label="Title">
                      <Input readOnly={status === 'Completed' ? true : false} type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col className="ant-col-24" md={24}>
                    <Form.Item rules={[{ required: true, message: "Please enter the description" }]} name="description" label="Description">
                      <Input.TextArea readOnly={status === 'Completed' ? true : false} autoSize={{ minRows: 4, maxRows: 6 }} type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col className="ant-col-24" md={mediaUrl.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ? 24 : 12}>
                    <Form.Item name="media" label="Media">
                      {
                        status === 'Completed' ?
                          mediaUrl ?
                            null
                            :
                            <label style={{ cursor: `${status === 'Completed' ? 'not-allowed' : 'pointer'}` }} className="media-upload">
                              <span>No file was uploaded</span>
                              <input disabled={true} accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf" style={{ display: "none" }} type="file" />
                            </label>
                          :
                          <label style={{ cursor: `${status === 'Completed' ? 'not-allowed' : 'pointer'}` }} className="media-upload">
                            <span>Choose a file</span>
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
                {
                  status !== 'Completed' ?
                    <Row style={{ marginTop: "2rem" }}>
                      <Col style={{ display: "flex", justifyContent: "center" }} className="ant-col-24" md={24}>
                        <Button className="create-task-btn" htmlType="submit">Edit Task</Button>
                      </Col>
                    </Row>
                    :
                    null
                }
              </Form>
            </Col>
          </Row>
        </Modal>
        <div className="tasks-heading">Tasks</div>
        <div>
          <Row>
            <Col className="ant-col-24" md={4}>
              <div className="create-task" onClick={() => { setMediaUrl(''); setIsModalVisible(true) }}>
                <i class="fa fa-plus" aria-hidden="true" style={{ marginRight: "10px" }}></i> Create task
              </div>
            </Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
            <Col className="ant-col-24" md={4}>
              <div className="create-task" onClick={() => { props.history.push('/deletedtasks') }}>
                <i class="fa fa-trash-alt" style={{ marginRight: "10px" }}></i> Deleted tasks
              </div>
            </Col>
          </Row>


        </div>
        <div style={{ marginTop: "2rem" }}>
          <div>
            <Row gutter={[30, 10]}>
              <Col className="ant-col-24" md={8}>
                <div className="status-div">
                  <Row>
                    <Col className="ant-col-24" md={24}>
                      <div className="status-heading" style={{ borderTop: "solid 3px #b5babf" }}>
                        Open
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "2rem", maxHeight: "400px", overflowY: "scroll" }}>
                    {
                      props?.website?.tasks?.tasks?.filter(f => f.status === 'Open' && f.isDeleted === false).map(m => (
                        <div draggable onDragStart={(e) => { onDragStart(e, m._id) }} className="tasks">
                          {m.title}
                          <div style={{ width: "25%" }}>
                            <i class="fa fa-edit edit-icon" onClick={() => particularTaskDetails(m)}></i>
                            <Popconfirm
                              className="fa fa-trash-alt delete-icon"
                              title="Are you sure you want to delete this task?"
                              onConfirm={confirm}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <i class="fa fa-trash-alt delete-icon" onClick={() => setTaskId(m._id)}></i>
                            </Popconfirm>
                          </div>
                        </div>

                      ))
                    }
                  </Row>
                </div>
              </Col>
              <Col className="ant-col-24" md={8}>
                <div onMouseOut={() => { highlightDropArea('in-progress', false) }} onDragLeave={() => { highlightDropArea('in-progress', false) }} onDragEnter={() => { highlightDropArea('in-progress', true) }} onDragOver={(e) => {highlightDropArea('in-progress', true);onDragOver(e)}} onDrop={(e) => { highlightDropArea('in-progress', false); onDrop(e, "InProgress") }} className="status-div">
                  <Row>
                    <Col className="ant-col-24" md={24}>
                      <div className="status-heading" style={{ borderTop: "solid 3px #86aef7" }}>
                        In Progress
                      </div>
                    </Col>
                  </Row>
                  <Row id="in-progress" style={{ marginTop: "2rem", maxHeight: "400px", overflowY: "scroll", minHeight: "100px", borderRadius: "5px" }}>
                    {
                      props?.website?.tasks?.tasks?.filter(f => f.status === 'InProgress' && f.isDeleted === false).map(m => (
                        <div draggable onDragStart={(e) => { onDragStart(e, m._id) }} className="tasks">
                          {m.title}
                          <div style={{ width: "25%" }}>
                            <i class="fa fa-edit edit-icon" onClick={() => particularTaskDetails(m)}></i>
                            <Popconfirm
                              className="fa fa-trash-alt delete-icon"
                              title="Are you sure you want to delete this task?"
                              onConfirm={confirm}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <i class="fa fa-trash-alt delete-icon" onClick={() => setTaskId(m._id)}></i>
                            </Popconfirm>
                          </div>
                        </div>
                      ))
                    }
                  </Row>
                </div>
              </Col>
              <Col className="ant-col-24" md={8}>
                <div  onMouseOut={() => { highlightDropArea('completed', false) }} onDragLeave={() => { highlightDropArea('completed', false) }} onDragEnter={() => { highlightDropArea('completed', true) }} onDragOver={(e) => {highlightDropArea('completed', true); onDragOver(e)}} onDrop={(e) => { highlightDropArea('completed', false); onDrop(e, "Completed") }} className="status-div">
                  <Row>
                    <Col className="ant-col-24" md={24}>
                      <div className="status-heading" style={{ borderTop: "solid 3px #62bc70" }}>
                        Completed
                      </div>
                    </Col>
                  </Row>
                  <Row id="completed" style={{ marginTop: "2rem", maxHeight: "400px", overflowY: "scroll", minHeight: "100px", borderRadius: "5px" }}>
                    {
                      props?.website?.tasks?.tasks?.filter(f => f.status === 'Completed' && f.isDeleted === false).map(m => (
                        <div className="tasks">
                          {m.title}
                          <div style={{ width: "20%" }}>
                            <i class="fa fa-eye edit-icon" onClick={() => particularTaskDetails(m)}></i>
                          </div>
                        </div>
                      ))
                    }
                  </Row>
                </div>
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
  createTask,
  setCreateTask,
  tasks,
  setTasks,
  particularTask,
  setParticularTask,
  changeStatus,
  setChangeStatus,
  editTask,
  setEditTask,
  deleteTask,
  setDeleteTask
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(Tasks));