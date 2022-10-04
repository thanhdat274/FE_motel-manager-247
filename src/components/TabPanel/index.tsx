import React, { Children } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

type IData = {
  label: string;
  value: number;
  children?: React.ReactNode;
};

type ITabPanel = {
  data: IData[];
};

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
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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

export default function TabPanelComponent({ data }: ITabPanel) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          className="overflow-auto"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          // scrollButtons
          allowScrollButtonsMobile
        >
          {data.map((data: IData) => (
            <Tab className="overflow-auto" key={data.label} label={data?.label} {...a11yProps(data?.value)} />
          ))}
        </Tabs>
      </Box>

      {data.map((data: IData, index: number) => (
        <TabPanel key={data.label + 1} value={value} index={index}>
          {data.children && data.children}
        </TabPanel>
      ))}
    </Box>
  );
}
