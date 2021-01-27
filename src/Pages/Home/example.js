export default {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  body: {
    resultSize: 4,
    totalRecords: 4,
    projects: [
      {
        PID: 123,
        projectName: "ABC",
        systemName: "X",
        status: [
          {
            Type: "Tech",
            Scope: "Conf",
            Asked: 67,
            Answered: 43,
            LastUserSubmitDT: "2020-09-11 02:49:56",
            LastReviewDT: "2020-09-10 08:40:26",
          },
          {
            Type: "Cyber",
            Scope: "Conf",
            Asked: 20,
            Answered: 18,
            LastUserSubmitDT: "2020-09-11 02:49:56",
            LastReviewDT: "2020-09-10 08:40:26",
          },
        ],
      },
      {
        PID: 134,
        projectName: "DEF",
        systemName: "Y",
        status: [
          {
            Type: "Tech",
            Scope: "Conf",
            Asked: 89,
            Answered: 86,
            LastUserSubmitDT: "2020-09-12 01:32:23",
            LastReviewDT: "2020-09-11 18:29:22",
          },
        ],
      },
      {
        PID: 141,
        projectName: "GHI",
        systemName: "Z",
        status: [
          {
            Type: "Tech",
            Scope: "Conf",
            Asked: 112,
            Answered: 112,
            LastUserSubmitDT: "2020-09-14 19:47:12",
            LastReviewDT: "2020-09-15 18:49:02",
          },
        ],
      },
    ],
  },
};
