import {Input, Form, Button, Upload, message} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './bookPageAdd.css'
import {useNavigate} from "react-router-dom";

function BookPageAdd() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    localStorage.setItem('values', JSON.stringify(values))
    navigate('/')
  }
  const onFinishFailed = (err) => {
    message.error({
      content: '表单不能为空',
      duration: 1
    })
  }
  return (
    <div className='addPageContainer'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="title"
          name="title"
          rules={[
            {
              required: true,
              message: 'title不能为空',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="author"
          name="author"
          rules={[
            {
              required: true,
              message: 'author不能为空',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/*<Form.Item*/}
        {/*  name="imageFiles"*/}
        {/*  rules={[{ required: true, message: '请选择图片' }]}*/}
        {/*>*/}
        {/*  <Upload accept=".jpg,.png,.jpeg">*/}
        {/*    <Button icon={<UploadOutlined />}>上传图片</Button>*/}
        {/*  </Upload>*/}
        {/*</Form.Item>*/}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default BookPageAdd
