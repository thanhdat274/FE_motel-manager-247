import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toast } from 'src/hooks/toast';
import { addContract } from 'src/pages/api/contract';

type Props = {};

const ReactQuill = dynamic(import('react-quill'), { ssr: false });
const ContractAdd = (props: Props) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onEditorStateChange = (editorState: any) => {
    setValue('content', editorState);
  };
  useEffect(() => {
    register('content', { required: true, minLength: 15 });
  }, [register]);

  //   const contract1 = watch('content');
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await addContract(data).then((data: any) => {
        router.push(`/manager/landlord/${param.id}/contract-form`);
        Toast('success', 'Thêm  hợp đồng thành công');
      });
    } catch (error) {
      Toast('error', 'Thêm hợp đồng không thành công');
      setLoading(false);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className="bg-cyan-400 text-white rounded-md px-5 py-3  mb-5 hover:bg-cyan-500">
          Thêm
        </button>
        <div>
          <h2 className="font-bold">Tiêu đề</h2>
          <input
            className="border p-2 w-[600px] mb-2"
            type="text"
            {...register('title', { required: true, minLength: 6 })}
          />
        </div>
        <ReactQuill theme="snow" modules={modules} onChange={onEditorStateChange} />
        <h1 className="Error">{errors.content && 'Bạn phải nhập trường này'}</h1>
      </form>
    </div>
  );
};

export default ContractAdd;
