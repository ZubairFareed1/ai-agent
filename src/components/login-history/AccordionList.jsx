// import { axios } from 'axios';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Timeline } from "primereact/timeline";
import "../../global.css";
import { useTheme } from "../../ThemeContext";
import { useEffect, useState } from "react";

function transformLoginHistory(data) {
  return data.map((item) => {
    const timestamp = new Date(item.timestamp); // Convert timestamp to Date object
    const loginDate = timestamp.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
    const loginTime = timestamp.toTimeString().split(" ")[0]; // Extract time in HH:mm:ss format

    return {
      id: item.login_id.toString(), // Convert login_id to a string
      loginDate,
      loginTime,
    };
  });
}
const groupLoginHistoryByDate = (loginHistory) => {
  return loginHistory.reduce((acc, item) => {
    // If the date is not already a key in the accumulator, create it
    if (!acc[item.loginDate]) {
      acc[item.loginDate] = [];
    }
    // Push the current item into the appropriate date group
    acc[item.loginDate].push(item);
    return acc;
  }, {});
};

export default function AccordionList() {
  return (
    <div className="p-5">
      <MyAccordion />
    </div>
  );
}
function MyAccordion() {
  const [loginHistory, setLoginHistory] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const getLoginHistory = async () => {
      try {
        const auth = JSON.parse(sessionStorage.getItem("auth"));
        const userId = JSON.parse(sessionStorage.getItem("user_id"));
        console.log(userId);
        if (!auth) {
          throw new Error("Authentication token not found");
        }

        const url = `http://localhost:3000/api/users/login-history`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.token}`,
          },
          body: JSON.stringify({ userId }),
        });
        const data = await response.json();
        setLoginHistory(data.loginHistory);
      } catch (err) {
        console.error("Error fetching login history:", err);
        alert('Failed to fetch profile data. Please try again later.')
      }
    };

    getLoginHistory();
  }, []);

  const groupedHistory = groupLoginHistoryByDate(transformLoginHistory(loginHistory));
  console.log(groupedHistory);


  return (
    <div>
      <Accordion activeIndex={0} className="">
        {Object.keys(groupedHistory).map((date) => (
          <AccordionTab
            header={date}
            key={date}
            className={`${theme === 'light' ? "accordion-tab-header-light" : "accordion-tab-header-dark"}`}
          >
            <Timeline 
              value={groupedHistory[date] || []} 
              content={(item) => <span className={`${theme === 'light' ? 'text-800' : 'text-400'} font-semibold`}>{item.loginTime}</span>} 
              className=""
            />
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
}
