import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../Components/Table";
import example from "./example";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "green",
    paddingTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function HomePage({ data = [], ...props }) {
  const classes = useStyles();
  const columns = [
    { Header: "Project Name", accessor: "projectName" },
    { Header: "System Name", accessor: "systemName" },
    { Header: "Type", accessor: "status[0].Type" },
    { Header: "Scope", accessor: "status[0].Scope" },
    { Header: "Asked", accessor: "status[0].Asked" },
    { Header: "Answered", accessor: "status[0].Answered" },
    {
      Header: "Latest User Edit",
      id: "status[0].LastUserSibmitDT",
      accessor: (d) => {
        console.log(d);
        return d["status[0].LastUserSibmitDT"];
      },
    },
    { Header: "Latest Review", accessor: "status[0].LastReviewDT" },
    { Header: "Action", accessor: "action" },
  ];
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Box display="flex" flex={2.5} height="100%" p={2} flexDirection="column">
        <Button variant="contained" className={classes.button}>
          Recent
        </Button>
        <Button variant="contained" className={classes.button}>
          Open Comment
        </Button>
        <Button variant="contained" className={classes.button}>
          Warnings
        </Button>
        <Button variant="contained" className={classes.button}>
          Committed
        </Button>
      </Box>
      <Box display="flex" flex={7.5} height="100%" bgcolor="white" p={0.5}>
        {props.errors ? (
          <Typography variant="h3" gutterBottom>
            Unable to reach server
          </Typography>
        ) : (
          <Table
            columns={columns}
            data={data}
            getCellProps={(cellInfo) => {
              const { row, column } = cellInfo;
              if (column.id === "status[0].Answered") {
                if (
                  row.values["status[0].Answered"] ===
                  row.values["status[0].Asked"]
                ) {
                  return {
                    style: {
                      backgroundColor: "red",
                    },
                  };
                }
              }
              return { style: { backgroundColor: "white" } };
            }}
          />
        )}
      </Box>
    </Grid>
  );
}

export default HomePage;
