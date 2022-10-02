import React from 'react';
import {useSelector} from "react-redux";

const Dashboard = () => {



    const { userInfo } = useSelector((state) => state.users)
    console.log(userInfo)

    const admin = userInfo?.authorities.some(item => item.authority==='ROLE_ADMIN');



    return (
        <div>
            <span>
                Welcome <strong>{userInfo?.username}!</strong> You can view this page
                because youre logged in
      </span>

            <div>
                Authorities : {userInfo?.authorities.map((authority)=>(
                    <div key={authority.authority}>
                        {authority.authority}
                    </div>
            ))}
                {admin?<div>youre a nigga</div>:null}

            </div>
        </div>
    );
};

export default Dashboard;
