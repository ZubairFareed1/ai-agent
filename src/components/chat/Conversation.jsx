import React from "react";
import { useTheme } from "../../ThemeContext";

const conversation = [
  {
    id: 1,
    timestamp: "2024-11-03T12:34:56Z",
    role: "user",
    message: "How can I handle authorization in a React application?",
  },
  {
    id: 2,
    timestamp: "2024-11-03T12:35:10Z",
    role: "assistant",
    message:
      "In React, handling authorization involves ensuring that users have the necessary permissions to access certain parts of your application. Here are some common methods:\n\n1. Role-Based Access Control (RBAC): Use roles to determine access levels.\n\n2. Token-Based Authorization (e.g., JWT): Validate users with tokens.\n\n3. Route Guards: Protect specific routes with React Router.\n\n4. Context for Centralized Authorization: Use React Context to manage access globally.",
  },
  {
    id: 3,
    timestamp: "2024-11-03T12:36:25Z",
    role: "user",
    message: "Could you provide an example of how to protect routes?",
  },
  {
    id: 4,
    timestamp: "2024-11-03T12:36:40Z",
    role: "assistant",
    message:
      "Certainly! Here’s an example of a protected route using React Router:\n\n```javascript\nimport { Route, Redirect } from 'react-router-dom';\n\nfunction PrivateRoute({ component: Component, ...rest }) {\n  const isAuthenticated = useAuth().isAuthenticated;\n\n  return (\n    <Route\n      {...rest}\n      render={(props) =>\n        isAuthenticated ? (\n          <Component {...props} />\n        ) : (\n          <Redirect to=\"/login\" />\n        )\n      }\n    />\n  );\n}\n```\n\nUse `PrivateRoute` for any route that requires authentication.",
  },
  {
    id: 5,
    timestamp: "2024-11-03T12:37:15Z",
    role: "user",
    message:
      "What are some best practices for handling authorization in a React application?",
  },
  {
    id: 6,
    timestamp: "2024-11-03T12:37:30Z",
    role: "assistant",
    message:
      "Best practices for authorization in React applications:\n\n1. Use a centralized authorization system.\n\n2. Implement role-based access control.\n\n3. Use token-based authorization.\n\n4. Protect routes with React Router.\n\n5. Implement error handling for authorization failures.\n\n6. Use context for centralized authorization.\n\n7. Implement rate limiting for authorization requests.",
  },
  {
    id: 7,
    timestamp: "2024-11-03T12:38:45Z",
    role: "user",
    message:
      "How can I integrate a token-based authorization system into my React application?",
  },
  {
    id: 8,
    timestamp: "2024-11-03T12:39:00Z",
    role: "assistant",
    message:
      "To integrate a token-based authorization system into your React application, you can use libraries like `jwt-decode` to decode and validate the token. Here’s a simple example:\n\n```javascript\nimport jwtDecode from 'jwt-decode';\n\nfunction isAuthorized(token) {\n  try {\n    const decoded = jwtDecode(token);\n    return decoded.authorized;\n  } catch (error) {\n    return false;\n  }\n}\n```\n\nUse `isAuthorized` to check if a user is authorized before allowing access to a route.",
  },
];

export default function Conversation() {
  return (
    <div className="flex flex-column gap-4 p-4">
      {conversation.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          message={message.message}
        />
      ))}
    </div>
  );
}

function MessageBubble({ role, message }) {
  const { theme } = useTheme();
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`p-2 md:p-3 border-round-md max-w-xs ${
          isUser ? `${theme==='light'? 'bg-blue-500':'bg-blue-300'}  text-white` : `${theme === 'light' ? 'surface-200 text-800' : 'surface-700 text-400'} shadow-1`
        }`}
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          borderRadius: "15px",
          maxWidth: "70%",
        }}
      >
        <p className="text-sm md:text-xl m-0">{message}</p>
      </div>
    </div>
  );
}
