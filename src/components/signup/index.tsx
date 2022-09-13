import React from 'react';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style.module.css';
type Props = {};

const SignUp = (props: Props) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div
            className={`${styles['box-modal-content']} border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none`}
          >
            {/*header*/}
            <h3 className="text-3xl font-semibold text-center mt-4">Đăng ký</h3>
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <form action="" className={`${styles['form-modal']}`}>
                <div className="mt-4">
                  <div>
                    <label className="block" htmlFor="Name">
                      Name
                      <label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </label>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block" htmlFor="email">
                      Email
                      <label>
                        <input
                          type="text"
                          placeholder="Email"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </label>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block">
                      Phone
                      <label>
                        <input
                          type="number"
                          placeholder="Phone"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </label>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block">
                      Address
                      <label>
                        <select
                          name="address"
                          id=""
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="0">Chọn</option>
                          <option value="1">Tuyên Quang</option>
                          <option value="2">Phú Thọ</option>
                        </select>
                      </label>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block">
                      Password
                      <label>
                        <input
                          type="password"
                          name="password"
                          id=""
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </label>
                    </label>
                  </div>

                  <div className="flex">
                    <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                      Đăng kí
                    </button>
                  </div>
                  <div className="mt-6 text-grey-dark">
                    Already have an account?
                    <a className="text-blue-600 hover:underline" href="#">
                      Log in
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
export default SignUp;
