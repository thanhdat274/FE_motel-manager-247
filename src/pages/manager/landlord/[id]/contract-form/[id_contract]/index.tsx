import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toast } from 'src/hooks/toast';

type Props = {};
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
const ContracEdit = (props: Props) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  const router = useRouter();
  const param = router.query;
  console.log(param);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const onEditorStateChange = (editorState: any) => {
    setValue('contract', editorState);
  };
  useEffect(() => {
    register('contract', { required: true, minLength: 15 });
  }, [register]);
  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get(
          `https://6332ba04a54a0e83d2570a0f.mockapi.io/api/contract-form/` + `${param.id_contract}`,
        );
        if (res.data) {
          reset(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, [param.id_room]);
  const contract1 = watch('contract');
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await axios
        .put(`https://6332ba04a54a0e83d2570a0f.mockapi.io/api/contract-form/` + `${param.id_contract}`, data)
        .then((data: any) => {
          router.push(`/manager/landlord/${param.id}/contract-form`);
          Toast('success', 'Cập nhật phòng thành công');
        });
    } catch (error) {
      Toast('error', 'Cập nhật phòng không thành công');
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <ReactQuill theme="snow" modules={modules} value={contract1} onChange={onEditorStateChange} />
        <h1 className="Error">{errors.contract && 'Bạn phải nhập trường này'}</h1>

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default ContracEdit;
