import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../Components/Table";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#355c35",
    paddingTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  cellWrapper: {
    // margin: theme.spacing(-2),
  },
  customCell: {
    // padding: theme.spacing(2),
    height: theme.spacing(6),
  },
  bgRed: {
    backgroundColor: "red",
  },
  vr: {
    marginLeft: theme.spacing(-2),
    height: 2,
    width: "calc(100% + 32px)",
    backgroundColor: "gray",
  },
}));

function HomePage({ data = [], ...props }) {
  const classes = useStyles();
  function spanRow(row, id) {
    const { status } = row;
    if (status.length) {
      return (
        <div className={classes.cellWrapper}>
          {status.map((s, index) => {
            let isRed = false;
            if (id === "Asked") {
              if (s[id] === s["Answered"]) isRed = true;
            }
            return (
              <React.Fragment key={index}>
                <div
                  className={clsx(classes.customCell, isRed && classes.bgRed)}
                >
                  {s[id]}
                </div>
                {index + 1 !== status.length && <div className={classes.vr} />}
              </React.Fragment>
            );
          })}
        </div>
      );
    }
    return "";
  }
  const columns = [
    { Header: "Project Name", accessor: "projectName" },
    { Header: "System Name", accessor: "systemName" },
    { Header: "Type", id: "Type", accessor: (row) => spanRow(row, "Type") },
    { Header: "Scope", id: "Scope", accessor: (row) => spanRow(row, "Scope") },
    { Header: "Asked", id: "Asked", accessor: (row) => spanRow(row, "Asked") },
    {
      Header: "Answered",
      id: "Answered",
      accessor: (row) => spanRow(row, "Answered"),
    },
    {
      Header: "Latest User Edit",
      id: "LastUserSibmitDT",
      accessor: (row) => spanRow(row, "LastUserSibmitDT"),
    },
    {
      Header: "Latest Review",
      id: "LastReviewDT",
      accessor: (row) => spanRow(row, "LastReviewDT"),
    },
    {
      Header: "Action",
      id: "action",
      accessor: (row) => {
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => onReview(row)}
            >
              Review
            </Button>
            {row.Answered === row.Asked && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => onCommit(row)}
              >
                Commit
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  function onReview(row) {
    console.log(row);
  }
  function onCommit(row) {
    console.log(row);
  }
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Box display="flex" flex={1.5} height="100%" p={2} flexDirection="column">
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
      <Box display="flex" flex={8.5} height="100%" bgcolor="white" p={0.5}>
        {props.errors ? (
          <Typography variant="h3" gutterBottom>
            Unable to reach server
          </Typography>
        ) : (
          <Table
            columns={columns}
            data={data}
            getColumnProps={(cellInfo) => {
              if (cellInfo.id === "projectName") {
                return { style: { width: 150 } };
              }
              return { style: {} };
            }}
            meta={props.meta}
          />
        )}
      </Box>
    </Grid>
  );
}

export default HomePage;
