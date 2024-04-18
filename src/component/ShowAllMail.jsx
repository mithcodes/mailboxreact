import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ShowMailListItem from "./ShowMailListItem";
import { useDispatch, useSelector } from "react-redux";
import { getMails } from "../actions/crudApis";
import { emailSliceActions } from "../store/store";

function ShowAllMail() {
  

  const recievedMailsStore = useSelector((state) => state.email.recieved);
  const sentMailsStore = useSelector((state) => state.email.sent);
  const stack = useSelector((state) => state.email.stack);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  console.log(sentMailsStore, stack, "HIIII");
  // setSentMails(sentMailsStore);

  useEffect(() => {
    const getMailsFirsttime = async (userEmail) => {
      let data = await getMails(userEmail);
      console.log(data);
      dispatch(emailSliceActions.setMails(data));
    };

    getMailsFirsttime(userEmail);

    const interval = setInterval(() => {
      getMailsFirsttime(userEmail);
      console.log("Effect ShowAllMails");
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="sam_heading">{`${stack} Mails`}</div>
      <div>
        <Row>
          <Col sm={4} className="sam_hcol">
            From
          </Col>
          <Col sm={8} className="sam_hcol">
            Subject
          </Col>
        </Row>
      </div>
      <div>
        {stack === "recieved" && recievedMailsStore.length >= 1 && (
          <ShowMailListItem mails={recievedMailsStore} />
        )}
        {stack === "sent" && sentMailsStore.length >= 1 && (
          <ShowMailListItem mails={sentMailsStore} />
        )}
      </div>
    </div>
  );
}

export default ShowAllMail;
