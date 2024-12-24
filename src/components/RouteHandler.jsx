import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  // Save the current route to sessionStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem("lastVisitedRoute", location.pathname);
    }
  }, [location, isInitialized]);

  // On initial load, check sessionStorage for the last route
  useEffect(() => {
    const lastRoute = sessionStorage.getItem("lastVisitedRoute");

    if (lastRoute && lastRoute !== location.pathname) {
      navigate(lastRoute); // Redirect to the saved route
    }

    setIsInitialized(true); // Mark as initialized after the check
  }, [navigate, location.pathname]);

  // Show a placeholder while initializing
  if (!isInitialized) return <div>Loading...</div>;

  return null; // This component doesn't render anything else
};

export default RouteHandler;
