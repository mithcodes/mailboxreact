import React, { useState, useRef, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { sendMail } from "../actions/crudApis";
import { useDispatch, useSelector } from "react-redux";
import { emailSliceActions, uiSliceActions } from "../store/store";

const ComposeMail = ({ placeholder }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const userEmail = useSelector((state) => state.auth.email);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");

  const handleSend = async () => {
    if (to || subject || value) {
      const data = await sendMail({
        subject,
        value,
        to,
        from: userEmail,
        read: false,
      });
      dispatch(uiSliceActions.hideCompose());
      dispatch(uiSliceActions.hideReadMode());
      dispatch(emailSliceActions.setStack("recieved"));
    } else {
      if (!to) return alert("Enter recipent email");
      if (!subject) return alert("Write subject of your composed mail");
      if (!value) return alert("write body of your composed mail");
    }
    setValue("");
    setTo("");
    setSubject("");
  };

  return (
    <div>
      <h2>Compose New Mail</h2>
      <Form>
        <Form.Group controlId="formTo">
          <Form.Label>To:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formMailBody">
          <Form.Label>Mail Body:</Form.Label>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="editor"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSend} className="mt-3">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default ComposeMail;
