import React from "react";
import HomePage from "./HomePage";
import axios from "axios";

function Home(props) {
  const [resp, setResp] = React.useState({
    meta: {},
    data: [],
  });
  const [errors, setErrors] = React.useState("");
  React.useEffect(() => {
    axios
      .post("https://175igdutw5.execute-api.us-east-2.amazonaws.com/Dev", {
        usr: "test",
        dateTime: "mm/dd/yyyy hh:mm:ss",
      })
      .then((resp) => {
        if (resp.data.statusCode !== 200) {
          setErrors("Unable to reach server");
        } else {
          setResp({
            meta: {
              resultSize: resp.data.body.resultSize,
              totalRecords: resp.data.body.totalRecords,
            },
            data: resp.data.body.projects,
          });
        }
      });
  }, []);
  return <HomePage data={resp.data} meta={resp.meta} errors={errors} />;
}

export default Home;
