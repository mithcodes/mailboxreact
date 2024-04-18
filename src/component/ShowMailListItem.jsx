import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailSliceActions, uiSliceActions } from "../store/store";
import { deleteteMail, getMails, updateMail } from "../actions/crudApis";

function ShowMailListItem({ mails }) {
  const stack = useSelector((state) => state.email.stack);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const handleUpdateEmail = async (e) => {
    try {
      const data = await updateMail(userEmail, e, stack);
      if (data.error) throw new Error(data.error);
      const res = await updateMail(userEmail);
      if (data.error) throw new Error(res.error);
      dispatch(emailSliceActions.setMails(res));
    } catch (error) {
      console.log(error);
    }
    dispatch(emailSliceActions.setActivEmail(e.id));
    dispatch(uiSliceActions.showReadMode());
  };

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
  };

  return (
    <>
      {mails &&
        mails.map((e) => {
          return (
            <Row key={e.id} className="show_email">
              <Col
                sm={4}
                className="sam_col sam_row"
                onClick={() => handleUpdateEmail(e)}
              >
                <div className={e.read === false ? "dot" : ""}></div>
                <div className="overflow">{e.from}</div>
              </Col>
              <Col sm={7} className="sam_col sam_del">
                <div onClick={() => handleUpdateEmail(e)}>{e.subject}</div>
              </Col>
              <Col sm={1}>
                <Button
                  variant="danger"
                  className="del_btn"
                  onClick={() => {
                    handleDelete(userEmail, e, stack);
                  }}
                >
                  Delete
                </Button>
                {/* <Button
                  variant="danger"
                  className="del_btn"
                  onClick={() => {
                    handleDelete(userEmail, e, stack);
                  }}
                >
                  Delete
                </Button> */}
              </Col>
            </Row>
          );
        })}
    </>
  );
}

export default ShowMailListItem;
