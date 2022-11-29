import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Graph from "../Components/Graph";
import { auth, db } from "../firebaseConfig";

const ComparePage = () => {
  // will give out the username from navigated link
  const { username } = useParams();
  const [loggedInUserData, setLoggedInUserData] = useState([]);
  const [compareUserData, setCompareUserData] = useState([]);
  const [loggedInUserGraphData, setLoggedInUserGraphData] = useState([]);
  const [compareUserGraphData, setCompareUserGraphData] = useState([]);

  // check username availability fucntion in compare button component gives out uid
  const getUID = async () => {
    const ref = db.collection("usernames").doc(`${username}`);
    const response = await ref.get();
    return response.data().uid;
  };

  const getData = async () => {
    // user id to compare
    const userUID = await getUID();

    // logged in user id
    const { uid } = auth.currentUser;
    const resultRef = db.collection("Results");

    let tempData = [];
    let tempGraphData = [];

    resultRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
          setLoggedInUserData(tempData);
          setLoggedInUserGraphData(tempGraphData);
        });
      });

    // fetch data for user id to compare
    // dont keep same variables as above for tempdata since the promises takes some time to run whereas the variables would be emptied instantly after the first call hence can interfere with the second call
    let tempData1 = [];
    let tempGraphData1 = [];
    resultRef
      .where("userId", "==", userUID)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData1.push({ ...doc.data() });
          tempGraphData1.push([doc.data().timeStamp, doc.data().wpm]);
          setCompareUserData(tempData1);
          setCompareUserGraphData(tempGraphData1);
        });
      });
  };

  // calling the getData function when the page loads
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Graph graphData={loggedInUserGraphData} type="date" />
      <Graph graphData={compareUserGraphData} type="date" />
    </div>
  );
};

export default ComparePage;


// logic for leaderboard
// fetch all the result data - just remove the where condition in fetch user data function or getdata function to get all the data instead of just id 
// put all of it in an array
// map a map, mapping will be from uid to result object
// loop over the array and check if the uid is present in map, if it is present then check that result.wpm < curr.wpm change the change the result object
// after this we will have the best spead of that particular user
// now sort all the objects based on wpm