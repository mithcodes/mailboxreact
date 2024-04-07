// Helping functions ----------------------------------------------------------------------------

function objectToArrayWithIds(obj) {
  return Object.keys(obj).map((key) => ({ ...obj[key], id: key }));
}

const url = "https://mailboxclient-45cc0-default-rtdb.firebaseio.com/";

// get emails -------------------------------------------------------------------------------

export const getMails = async (email) => {
  const mail = email.replace(".", "");

  try {
    const response = await fetch(
      `https://mailboxclient-45cc0-default-rtdb.firebaseio.com/${mail}.json`,
      {
        method: "GET",
      }
    );

    const resData = await response.json();
    if (resData.error) throw new Error(resData.error);

    let recieved, sent;

    if (!resData.recieved) {
      recieved = [];
    } else {
      recieved = objectToArrayWithIds(resData.recieved).reverse();
    }
    if (!resData.sent) {
      sent = [];
    } else {
      sent = objectToArrayWithIds(resData.sent).reverse();
    }

    return { recieved, sent };
  } catch (error) {
    console.log(error);
  }
};

// send email -------------------------------------------------------------------------------------

export const sendMail = async (payload) => {
  const { to, from } = payload;
  const email = to.replace(".", "");
  const fromEmail = from.replace(".", "");

  try {
    // To reciepents

    const response = await fetch(
      `https://mailboxclient-45cc0-default-rtdb.firebaseio.com/${email}/recieved.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const resData = await response.json();

    if (resData.error) throw new Error(resData.error);

    // To sender

    const senderResponse = await fetch(
      `https://mailboxclient-45cc0-default-rtdb.firebaseio.com/${fromEmail}/sent.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const senderData = await senderResponse.json();
    if (senderData.error) throw new Error(senderData.error);

    return await getMails(from);
  } catch (error) {
    console.log(error, "Send Mail");
  }
};

// Update  Recieved Email-----------------------------------------------------------------------------

export const updateMail = async (userEmail, e, stack) => {
  const mail = userEmail.replace(".", "");

  try {
    const response = await fetch(
      `https://mailboxclient-45cc0-default-rtdb.firebaseio.com/${mail}/${stack}/${e.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ ...e, read: true }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = await response.json();
    if (resData.error) throw new Error(resData.error);
    return await getMails(mail);
  } catch (error) {
    console.log(error, "Update Mail");
  }
};

// Delete Recieved Email

export const deleteteMail = async (userEmail, e, stack) => {
  const mail = userEmail.replace(".", "");
  //console.log(mail, e, stack);

  try {
    const response = await fetch(
      `https://mailboxclient-45cc0-default-rtdb.firebaseio.com/${mail}/${stack}/${e.id}.json`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    return await getMails(mail);
  } catch (error) {
    console.log(error, "CRUD deleteMail");
  }
};
