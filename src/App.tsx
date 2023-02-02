import React, { useEffect, useState } from 'react';
import './App.css';
import Main from "./components/Main";
import { ContextState } from "./context";
type myState = {
  data: any;
  loading: boolean;
};

function App() {
  const [state, setState] = useState<React.SetStateAction<myState>>({
    data: [],
    loading: true,
  });

  const submitter = () => {
    fetch('online_retail.csv')
      .then((csvFilePath) => csvFilePath.text())
      .then((res) =>{console.log(res); setState({ ...state, data: Csv_to_objArray(res), loading: false })});
  };

  const Csv_to_objArray = (text: string, quoteChar = '"', delimiter = ",") => {
    var rows = text.split("\n");
    var headers = rows[0].split(",");
    const regex = new RegExp(
      `\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`,
      "gs"
    );
    const match = (line: any) =>
      [...line.matchAll(regex)].map((m) => m[2]).slice(0, -1);
    var lines = text.split("\n");
    const heads = headers ?? match(lines.shift());
    lines = lines.slice(1);
    return lines.map((line) => {
      return match(line).reduce((acc, cur, i) => {
        // replace blank matches with `null`
        const val = cur.length <= 0 ? null : Number(cur) || cur;
        const key = heads[i] ?? `{i}`;
        return { ...acc, [key]: val };
      }, {});
    });
  };

  useEffect(() => {
    submitter();
  }, []);

  console.log(state);

  return (
    <ContextState.Provider value={{ state, setState }}>
      <Main />
    </ContextState.Provider>
  );
}


export default App;
