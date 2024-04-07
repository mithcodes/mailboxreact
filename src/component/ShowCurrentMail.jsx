import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteteMail, getMails } from "../actions/crudApis";
import { emailSliceActions, uiSliceActions } from "../store/store";

function ShowCurrentMail() {
  const stack = useSelector((state) => state.email.stack);
  const emailId = useSelector((state) => state.email.currentEmail);
  let receivedEmails = useSelector((state) => state.email.recieved);
  let sentEmails = useSelector((state) => state.email.sent);
  let userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const getEmail = (emailId) => {
    let email = { from: "hello", subject: "hello", value: "hello" };
    let activeEmail = null;

    if (stack === "recieved") {
      activeEmail = receivedEmails.find((e) => {
        return e.id === emailId;
      });
    } else if (stack) {
      activeEmail = sentEmails.find((e) => {
        return e.id === emailId;
      });
    }

    if (activeEmail) return activeEmail;
    return email;
  };

  let reqEmail = getEmail(emailId);

  const handleDelete = async (userEmail, e, stack) => {
    try {
      const data = await deleteteMail(userEmail, e, stack);
      if (data.error) throw new Error(data.error);
      const res = await getMails(userEmail);
      if (data.error) throw new Error(res.error);
      dispatch(emailSliceActions.setMails(res));
    } catch (error) {
      console.log(error);
    }
    dispatch(uiSliceActions.hideReadMode());
  };

  useEffect(() => {
    let p = document.getElementById("hi");
    p.innerHTML = reqEmail.value;
  }, []);

  return (
    <>
      <div>
        <div className="sam_del sc_subject">
          <p>
            Subject: <span className="sub">{reqEmail.subject}</span>
          </p>
          <Button
            variant="danger"
            className="del_btn"
            onClick={() => handleDelete(userEmail, reqEmail, stack)}
          >
            Delete
          </Button>
        </div>
        <p id="hi" className="sc_body"></p>
      </div>
    </>
  );
}

export default ShowCurrentMail;
