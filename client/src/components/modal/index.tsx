import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export function showConfirm(props: any) {
  confirm({
    title: props.title ? props.title : 'Thông báo',
    icon: <ExclamationCircleOutlined />,
    content: props.content ? props.content : '',
    onOk() {
      // console.log('OK');
      if (props.onOk) props.onOk();
    },
    onCancel() {
      // console.log('Cancel');
      if (props.onCancel) props.onCancel();
    },
  });
}

export const ModalComponent = (props: any) => {
  const { isModalVisible, onOK, onCancel } = props;

  const handleOk = () => {
    if (onOK) onOK();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <Modal
      title='Basic Modal'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      {...props}
    >
      {props.children}
    </Modal>
  );
};
