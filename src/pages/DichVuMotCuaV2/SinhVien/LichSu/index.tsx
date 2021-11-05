/* eslint-disable no-underscore-dangle */
import TableBase from '@/components/Table';
import Form from '@/pages/DichVuMotCuaV2/components/FormBieuMau';
import type { IColumn } from '@/utils/interfaces';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const LichSuGuiDon = () => {
  const {
    page,
    limit,
    condition,
    getDonSinhVienModel,
    getAllBieuMauModel,
    loading,
    visibleFormBieuMau,
    setVisibleFormBieuMau,
  } = useModel('dichvumotcuav2');
  const [recordView, setRecordView] = useState<DichVuMotCuaV2.Don>();
  const [type, setType] = useState<string>('view');
  useEffect(() => {
    getAllBieuMauModel();
  }, []);
  const columns: IColumn<DichVuMotCuaV2.Don>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'center',
      width: 200,
    },
    {
      title: 'Loại đơn',
      dataIndex: ['thongTinDichVu', 'ten'],
      align: 'center',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      align: 'center',
      render: (val) => <div>{moment(val).format('HH:mm DD/MM/YYYY')}</div>,
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 100,
      render: (record: DichVuMotCuaV2.Don) => {
        return (
          <>
            <Tooltip title="Chi tiết">
              <Button
                onClick={() => {
                  setRecordView(record);
                  setVisibleFormBieuMau(true);
                  setType('view');
                }}
                shape="circle"
                icon={<EyeOutlined />}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <TableBase
        dataState="danhSachDon"
        widthDrawer="60%"
        title="Lịch sử gửi đơn"
        modelName="dichvumotcuav2"
        columns={columns}
        loading={loading}
        dependencies={[page, limit, condition]}
        getData={getDonSinhVienModel}
      />

      <Modal
        destroyOnClose
        width="60%"
        footer={false}
        visible={visibleFormBieuMau}
        bodyStyle={{ padding: 0 }}
        onCancel={() => {
          setVisibleFormBieuMau(false);
        }}
      >
        <Form type={type} record={recordView} />
      </Modal>
    </>
  );
};

export default LichSuGuiDon;
