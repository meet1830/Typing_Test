import React, { useEffect } from 'react'
import { auth, db } from '../firebaseConfig';
import Graph from './Graph'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAlert } from '../Context/AlertContext';

const Stats = ({wpm, accuracy, graphData, correctChars, incorrectChars, extraChars, missedChars}) => {

  //  to counter multiple entries of same value in x axis time, use sets
  let timeSet = new Set();
  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  })

  const [user] = useAuthState(auth);
  const {setAlert} = useAlert(); 

  // pushing data to firestore
  const pushResultsToDB = async() => {
    // need reference to the results collection in our database
    const resultsRef = db.collection('Results');
    
    // getting userid of the logged in user
    const {uid} = auth.currentUser;

    // if accuracy comes NAN, then the test is considered invalid
    if (!isNaN(accuracy)) {
      // push results to db
      // the document that we create here in resultsRef that will be added to db
      await resultsRef.add({
        userId: uid,
        wpm: wpm,
        accuracy: accuracy,
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        timeStamp: new Date(),
        // tells when the test was taken
      })
      .then((res) => {
        setAlert({
          open: true,
          type: 'success',
          message: 'Result saved',
        });
      });
    } else {
      setAlert({
        open: true,
        type: 'error',
        message: 'Invalid test'
      })
    }

  }

  // if the component is rendering - useeffect then only have to run above function
  useEffect(() => {
    // if user is logged in then only run pushresultstodb function
    if (user) {
      pushResultsToDB();
    } else {
      // give alert - log in or signup to save results
      setAlert({
        open: true,
        type: 'warning',
        message: 'Login to save results!'
      });
    }
  }, []);

  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            {/* <div className="subtitle">30/2/3/3</div> */}
            {/* typed chars/incorrect/extra/missed */}
            <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        </div>
        <div className="right-stats">
            {/* <Graph graphData={graphData} /> */}
            {/* pass filtered graph value */}
            <Graph graphData={newGraph} />
        </div>
    </div>
  )
}

export default Stats