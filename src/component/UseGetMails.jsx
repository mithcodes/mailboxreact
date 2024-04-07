import { useEffect, useState } from "react";

function useGetMails(email) {
  const [mails, setMails] = useState({ received: [], sent: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

        let received, sent;

        if (!resData.recieved) {
          received = [];
        } else {
          received = objectToArrayWithIds(resData.recieved).reverse();
        }
        if (!resData.sent) {
          sent = [];
        } else {
          sent = objectToArrayWithIds(resData.sent).reverse();
        }

        setMails({ received, sent });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return { mails, loading, error };
  });
}
export default useGetMails;
