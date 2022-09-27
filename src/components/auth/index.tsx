import React from 'react';
type Props = {};
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Auth = (props: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-5">
            <div className="flex justify-center">
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Đăng nhập" {...a11yProps(0)} />
                <Tab label="Đăng ký" {...a11yProps(1)} />
              </Tabs>
            </div>

            <TabPanel value={value} index={0}>
              <form className="space-y-4" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="True" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="grid gap-6">
                    <div className="col-span-12">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Email..."
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <form className="space-y-4" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="True" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="grid gap-6">
                    <div className="col-span-12">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập Email..."
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                        Tên của bạn
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập tên..."
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập số điện thoại..."
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </TabPanel>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default Auth;
