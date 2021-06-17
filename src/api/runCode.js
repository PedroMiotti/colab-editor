import axios from "axios";


export const runCode = async (source_code,stdin, language_id) => {
    let token;
    let solutionJson;

    const response = await axios
      .post(`http://localhost:2358/submissions`, {
        source_code,
        stdin,
        language_id,
      })
      .then((res) => {
        token = res.data.token;
      });

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      if (token) {
        const getResult = await axios
          .get(`http://localhost:2358/submissions/${token}`)
          .then((res) => {
            jsonGetSolution = res.data;
            return jsonGetSolution;

          });
      }
    }
    return jsonGetSolution;
  };
