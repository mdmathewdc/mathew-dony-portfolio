import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

const RenderedTabs = (data, value) => {
  return data.map((job, index) => (
    <TabPanel value={value} index={index} key={index}>
      <JobTabContainer>
        <p>
          {job.role} @ <a href={job.url}>{job.name}</a>
        </p>
        <p className="job-time">{job.time}</p>
        <ul>
          {job.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </JobTabContainer>
    </TabPanel>
  ));
};

const TabPanel = (props) => {
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
        <Box sx={{ p: 3, paddingTop: 0, paddingBottom: 0 }}>{children}</Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// ARIA Accessibility Props
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const JobTab = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        desktop: 768,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            mobile: "100vw",
            desktop: "100%",
          },
          marginLeft: {
            mobile: "-5vw",
            desktop: 0,
          },
          marginRight: {
            mobile: "-5vw",
            desktop: 0,
          },
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            allowScrollButtonsMobile
            variant="scrollable"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#4398c1",
              },
            }}
          >
            {data.map((job, index) => (
              <Tab
                key={index}
                sx={{ color: "white", textTransform: "none" }}
                label={job.name}
                style={{ color: "#4398c1" }}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        {RenderedTabs(data, value)}
      </Box>
    </ThemeProvider>
  );
};

const JobTabContainer = styled.div`
  .job-time {
    font-size: 0.8rem;
    color: #21a9f3;
    font-weight: 500;
  }

  ul {
    padding-left: 4vw;
    font-size: 15px;
    color: #9cb1bb;
    text-align: justify;
    list-style: circle;
    font-weight: 300;
    line-height: 18px;
  }

  li:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  a {
    background: -webkit-linear-gradient(180deg, #ff0022, #0ea9fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
  }
`;

export default JobTab;
