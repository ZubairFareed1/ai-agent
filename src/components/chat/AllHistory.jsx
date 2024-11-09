import React, {useState} from 'react'
import '../../global.css'
import { useTheme } from '../../ThemeContext';
import SearchHistory from './SearchHistory';
import { useNavigate } from 'react-router-dom';


  

export default function AllHistory() {
  const {theme} = useTheme()
  const [ searchHistory, setSearchHistory ] = useState([
    {
      id: 1,
      query: "How to learn React?",
      response: "React is a JavaScript library for building user interfaces. You can start learning by following the official React documentation.",
      dateTime: "2024-11-03 20:15:30",
    },
    {
      id: 2,
      query: "What is Node.js?",
      response: "Node.js is a runtime environment that allows JavaScript to run on the server side. It's often used for backend development.",
      dateTime: "2024-11-02 20:20:45",
    },
    {
      id: 3,
      query: "How to center a div in CSS?",
      response: "You can center a div using `display: flex; justify-content: center; align-items: center;` on its parent container.",
      dateTime: "2024-11-01 10:25:12",
    },
    {
      id: 4,
      query: "Difference between var, let, and const?",
      response: "`var` has function scope, `let` and `const` have block scope. `const` is for constants that don’t change.",
      dateTime: "2024-11-01 10:30:18",
    },
    {
      id: 5,
      query: "What is an API?",
      response: "An API (Application Programming Interface) is a set of rules that allows different applications to communicate with each other.",
      dateTime: "2024-11-01 10:35:55",
    },
    {
      id: 6,
      query: "How to make a GET request in JavaScript?",
      response: "You can use `fetch('url')` or `axios.get('url')` to make GET requests in JavaScript.",
      dateTime: "2024-11-01 10:40:32",
    },
    {
      id: 7,
      query: "What is async/await?",
      response: "`async` and `await` are syntax used to handle asynchronous operations in JavaScript, making code more readable and avoiding callback hell.",
      dateTime: "2024-11-01 10:45:47",
    },
    {
      id: 8,
      query: "How to use local storage in JavaScript?",
      response: "Use `localStorage.setItem('key', 'value')` to store data, and `localStorage.getItem('key')` to retrieve it.",
      dateTime: "2024-11-01 10:50:05",
    },
    {
      id: 9,
      query: "What is JSX?",
      response: "JSX is a syntax extension for JavaScript that looks similar to HTML. It’s used in React to describe UI elements.",
      dateTime: "2024-11-01 10:55:22",
    },
    {
      id: 10,
      query: "How to install Node.js?",
      response: "Download the installer from the official Node.js website and follow the installation instructions for your OS.",
      dateTime: "2024-11-01 11:00:39",
    }
  ])
  return !searchHistory.length > 0 ? (
    <NoHistory theme={theme}/>) :( <div className=''>
    {
      searchHistory.map((item)=>(
        <HistoryCard item={item} key={item.id} />
        
      ))
    }
    
    </div>
  )
    
}

export function HistoryCard({item}){
    const {id, query, response, dateTime} = item;
    const {theme} = useTheme()
    const navigate = useNavigate()
    function timeAgo(date) {
      const now = new Date();
      const givenDate = new Date(date);
      const diffInSeconds = Math.floor((now - givenDate) / 1000);
    
      const minutes = Math.floor(diffInSeconds / 60);
      const hours = Math.floor(diffInSeconds / 3600);
      const days = Math.floor(diffInSeconds / 86400);
    
      if (minutes < 1) {
        return "Just now";
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 1) {
        return "More than 1 day ago";
      } else {
        // Format the date and time as "DD-MM-YYYY HH:MM"
        const options = { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false 
        };
        return givenDate.toLocaleDateString('en-GB', options).replace(',', '');
      }
    }
    
    return(
            <div className={`px-3 ${theme === 'light' ? 'hover:bg-blue-50 border-300' :'hover:surface-800 border-900'}  cursor-pointer border-y-1  flex gap-4 py-3 `}
            onClick={()=>{
              navigate(`/chatid?id=${id}`)
            }}
            >
                <div className='flex align-items-center'>
                    <div className={`w-3rem h-3rem border-round-sm ${theme === 'light' ? 'bg-blue-400' : 'surface-700'} flex align-items-center justify-content-center`}>
                        <span className={`text-2xl font-semibold text-white`}>S</span>
                    </div>
                </div>
                <div className='flex flex-column justify-content-between gap-2'>
                    <div className='flex justify-content-between'>
                            <span className='text-gray-500'>Assistant</span>
                            <span className='text-gray-500'>{timeAgo(dateTime)}</span>
                    </div>
                    <h2 className={`m-0 text-xl ${theme === 'light' ? 'text-700' : 'text-200'} truncate-text`}>{query}</h2>
                    <p className='m-0 truncate-text text-gray-500'>{response}</p>
                </div>
            </div>
    )
}

const  NoHistory = ({theme})=> {
  return(
    <div className='flex align-items-center justify-content-center'>
      <span className={`${theme === 'light' ? 'text-800' : 'text-white'}`}>No History</span>
    </div>
  )
}
