import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
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
  const { setLoading } = useUserContext();

  //console.log(param);

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
    setLoading(true);
    const getRoom = async () => {
      try {
        const res = await axios.get(
          `https://6332ba04a54a0e83d2570a0f.mockapi.io/api/contract-form/` + `${param.id_contract}`,
        );
        if (res.data) {
          reset(res.data as any);
          setLoading(false);
          //console.log('data', res.data);
        }
      } catch (error) {
        //console.log(error);
      }
    };
    getRoom();
  }, [param.id_room]);
  const contract1 = watch('contract');
  const onSubmit = async (data: any) => {
    setLoading(true);
    //console.log(data);
    try {
      await axios
        .put(`https://6332ba04a54a0e83d2570a0f.mockapi.io/api/contract-form/` + `${param.id_contract}`, data)
        .then((data: any) => {
          router.push(`/manager/landlord/${param.id}/contract-form`);
          Toast('success', 'Cập nhật hợp đồng thành công');
        });
    } catch (error) {
      Toast('error', 'Cập nhật hợp đồng không thành công');
      setLoading(false);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className="bg-cyan-400 text-white rounded-md px-5 py-3  mb-5 hover:bg-cyan-500">
          Cập nhật
        </button>
        <ReactQuill theme="snow" modules={modules} value={contract1} onChange={onEditorStateChange} />
        <h1 className="Error">{errors.contract && 'Bạn phải nhập trường này'}</h1>
      </form>
    </div>
  );
};

export default ContracEdit;
