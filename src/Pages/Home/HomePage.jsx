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
    { Header: "Type", accessor: "Type" },
    { Header: "Scope", accessor: "Scope" },
    { Header: "Asked", accessor: "Asked" },
    { Header: "Answered", accessor: "Answered" },
    {
      Header: "Latest User Edit",
      id: "LastUserSibmitDT",
      accessor: (d) => {
        return d["LastUserSibmitDT"];
      },
    },
    { Header: "Latest Review", accessor: "LastReviewDT" },
    {
      Header: "Action",
      id: "action",
      accessor: (row) => {
        console.log(row);
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Review
            </Button>
            {row.Answered === row.Asked && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Commit
              </Button>
            )}
          </div>
        );
      },
    },
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
              if (column.id === "Answered") {
                if (row.values["Answered"] === row.values["Asked"]) {
                  return {
                    style: {
                      backgroundColor: "red",
                    },
                  };
                }
              }
              return { style: { backgroundColor: "white" } };
            }}
            meta={props.meta}
          />
        )}
      </Box>
    </Grid>
  );
}

export default HomePage;
