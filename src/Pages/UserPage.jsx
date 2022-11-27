import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import Graph from "../Components/Graph";
import { useTheme } from "../Context/ThemeContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [user, loading] = useAuthState(auth);

  // notice that even after loading it takes some time
  // creating a state for that, removing the circular loading only when both the states are done
  const [dataLoading, setDataLoading] = useState(true);

  const { theme } = useTheme();

  const fetchUserData = () => {
    const resultRef = db.collection("Results");

    let tempData = [];

    // for graph
    let tempGraphData = [];

    const { uid } = auth.currentUser;

    resultRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        // console.log(snapshot);
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });

          // timestamp on x axis, wpm on y axis
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        // reversing graph data to show earlier tests first closer to origin and recent tests after wards
        setDataLoading(false);
      });
    // console.log("tempdata", tempData);

  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
  }, [loading]);

  if (loading || dataLoading) {
    return (
      <div className="center-of-screen">
        <CircularProgress size={200} color={theme.title} />
      </div>
    );
  }

  return (
    <div className="canvas">
      <div className="user-profile">
        <div className="user">
          <div className="picture">
            {/* apply display block first then can only use transform, dont know if the icon is span */}
            <AccountCircleIcon
              style={{
                display: "block",
                transform: "scale(6)",
                margin: "auto",
                marginTop: "3.5rem",
              }}
            />
          </div>
          <div className="info">
            <div className="email">{user.email}</div>
            <div className="joined-on">{user.metadata.creationTime}</div>
          </div>
        </div>
        <div className="total-times">
          <span>Total Test Taken - {data.length}</span>
        </div>
      </div>

      <div className="result-graph">
        <Graph graphData={graphData} type="date" />
      </div>

      <div className="table">
        <TableContainer style={{ maxHeight: "30rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  WPM
                </TableCell>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  Accuracy
                </TableCell>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  Characters
                </TableCell>
                <TableCell style={{ color: theme.title, textAlign: "center" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((i) => (
                <TableRow>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
                    {i.wpm}
                  </TableCell>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
                    {i.accuracy}
                  </TableCell>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
                    {i.characters}
                  </TableCell>
                  <TableCell
                    style={{ color: theme.title, textAlign: "center" }}
                  >
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
