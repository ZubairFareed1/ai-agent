import { Accordion, AccordionTab } from "primereact/accordion";
import { Timeline } from "primereact/timeline";
import "../../global.css";
import { useTheme } from "../../ThemeContext";

const loginHistory = [
  {
    id: "1",
    loginDate: "2024-11-04",
    loginTime: "08:30:00", // Time in HH:mm:ss format
  },
  {
    id: "2",
    loginDate: "2024-11-04",
    loginTime: "10:15:00",
  },
  {
    id: "3",
    loginDate: "2024-11-03",
    loginTime: "14:00:00",
  },
  {
    id: "4",
    loginDate: "2024-11-04",
    loginTime: "11:00:00",
  },
  {
    id: "5",
    loginDate: "2024-11-04",
    loginTime: "12:00:00",
  },
  {
    id: "6",
    loginDate: "2024-11-02",
    loginTime: "12:00:00",
  },
  {
    id: "7",
    loginDate: "2024-11-02",
    loginTime: "13:00:00",
  },
  {
    id: "8",
    loginDate: "2024-11-02",
    loginTime: "14:00:00",
  },
  {
    id: "9",
    loginDate: "2024-11-02",
    loginTime: "15:00:00",
  },
  {
    id: "10",
    loginDate: "2024-11-01",
    loginTime: "16:00:00",
  },
];
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
  const groupedHistory = groupLoginHistoryByDate(loginHistory);
  const { theme } = useTheme();

  return (
    <div>
      <Accordion activeIndex={0} className="">
        {Object.keys(groupedHistory).map((date) => (
          <AccordionTab header={date} key={date}
          className={`${theme === 'light' ?  "accordion-tab-header-light" : "accordion-tab-header-dark" }`}
          >
            <Timeline value={groupedHistory[date]} content={(item) =><span className={`${theme==='light'?'text-800':'text-400'} font-semibold`}>{item.loginTime}</span> } className=""/>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
}
