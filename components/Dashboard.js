import React from 'react';
import {useSelector} from "react-redux";

const Dashboard = () => {



    const { userInfo } = useSelector((state) => state.users)

    return (
        <div>
            <span>
                Welcome <strong>{userInfo?.username}!</strong> You can view this page
                because youre logged in
      </span>
        </div>
    );
};

export default Dashboard;
