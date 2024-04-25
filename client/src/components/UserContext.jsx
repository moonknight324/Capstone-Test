import React from "react";

const UserContext = React.createContext(
    {
        userName: '',
        setUserName: () => {},
        userEmail: '',
        setUserEmail: () => {}
    }
);

export default UserContext;