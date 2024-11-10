export function timeAgo(date) {
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