import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Context/AlertContext";
import { useTheme } from "../Context/ThemeContext";
import { auth, db } from "../firebaseConfig";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(2px)",
  },

  compareBox: {
    width: "auto",
    padding: "1rem",
    border: "1px solid",
  },
}));

const CompareButton = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { setAlert } = useAlert();

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const handleModal = () => {
    // if user exist then only open the modal
    if (user) {
      setOpen(true);
    } else {
      setAlert({
        open: true,
        type: "warning",
        message: "Login to compare",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkUserNameAvailability = async () => {
    const ref = db.collection("usernames").doc(`${username}`);
    const response = await ref.get();

    // if user enters his/her own username in compare box
    // match both uids to check this
    if (response.exists) {
      if (user.uid === response.data().uid) {
        // return false then will get the alert of invalid user in handle submit func
        return false;
      }
    }

    // not ! removed from below line
    return response.exists;
  };

  const handleSubmit = async () => {
    if (await checkUserNameAvailability()) {
      navigate(`/compare/${username}`);
    } else {
      setAlert({
        open: true,
        type: "warning",
        message: "username does not exist",
      });
    }
  };

  const classes = useStyles();
  const { theme } = useTheme();

  return (
    <div>
      <div
        className="compare-btn"
        onClick={handleModal}
        style={{
          cursor: "pointer",
          color: theme.background,
          background: theme.title,
          padding: "0.3rem",
          borderRadius: "5px",
          marginTop: "-5px",
        }}
      >
        COMPARE
      </div>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.compareBox}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            label="Enter username"
            variant="outlined"
            InputLabelProps={{
              style: {
                color: theme.title,
              },
            }}
            // style input font color
            inputProps={{
              style: {
                color: theme.title,
              },
            }}
          />
          <Button
            style={{
              backgroundColor: theme.title,
              color: theme.background,
              marginLeft: "5px",
              marginTop: "10px",
            }}
            onClick={handleSubmit}
          >
            Compare
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CompareButton;
