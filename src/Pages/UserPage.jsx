import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebaseConfig";
import Graph from "../Components/Graph";

const UserPage = () => {
  const [data, setData] = useState([]);

  const [graphData, setGraphData] = useState([]);

  // when reloading the page to display results the component renders instantly but the data from firebase takes some time to come. hence received error that user is null. for that firebase provides the loading state of firebase. use this loading state with useeffect to display loading message
  const [user, loading] = useAuthState(auth);

  const fetchUserData = () => {
    const resultRef = db.collection("Results");

    let tempData = [];

    // for graph
    let tempGraphData = [];

    const { uid } = auth.currentUser;
    // where function given by firebase. we can put conditions for parameters of our db. takes two arguments (parameter, condition)
    // it will return all documents if the condition is satisfied. hence not fetching all the results and put into an array and then search on it. hence security is not breached
    // get function to fetch the documents. returns an array
    // snapshot naming convention
    resultRef
      .where("userId", "==", uid)
      // also need to sort the table data order by function given by firebase
      // the indexes are required because without them the sorting operation requires a lot of computation, but with indexes they become very fast
      // it assigns index to every document and using it makes the sorting fast
      .orderBy('timeStamp', 'desc')
      .get()
      .then((snapshot) => {
        // console.log(snapshot);
        snapshot.docs.forEach((doc) => {
          // doc function provided by firebase will return the actual data json object that we have in db
          // doc is the snapshot and not the actual data. to have the data have to call data function
          // destructured so that there is no referencing issue
          tempData.push({ ...doc.data() });

          // timestamp on x axis, wpm on y axis
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        // reversing graph data to show earlier tests first closer to origin and recent tests after wards 
      });
    console.log("tempdata", tempData);
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
  }, [loading]);

  if (loading) {
    // return <h1>Loading...</h1>
    return (<CircularProgress size={200} />);
  }

  return (
    // applied canvas class which is predefined for grid of 3 rows for homepage
    <div className="canvas">

      <Graph graphData={graphData} type='date' />

      <div className="table">
        {/* using material ui components to make table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>WPM</TableCell>  
                <TableCell>Accuracy</TableCell>
                <TableCell>Characters</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* populating table rows using map */}
              {data.map((i) => (
                <TableRow>
                  <TableCell>{i.wpm}</TableCell>
                  <TableCell>{i.accuracy}</TableCell>
                  <TableCell>{i.characters}</TableCell>
                  <TableCell>
                    {/* firebase stores date in the timestamp type which is not supported */}
                    {i.timeStamp.toDate().toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserPage;
