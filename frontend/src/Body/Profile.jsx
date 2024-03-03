import React from 'react';
import Skel from './Skel';
import Templeate from './Templeate';

const Profile = ({ profile }) => {
    function handleRow() {
        if (!profile) return []; // Handle case where profile is not yet fetched
        let temp = [{ key: "1" }];
        let temp1 = Object.values(profile);
        let temp2 = Object.keys(profile);
        temp2.shift();
        temp2.pop();
        temp1.shift();
        for (let i = 0; i < temp2.length; i++) {
            temp[0][temp2[i]] = temp1[i];
        }
        return temp;
    }

    function handleCol() {
        if (!profile) return []; // Handle case where profile is not yet fetched
        let temp = [];
        let temp1 = Object.keys(profile);
        temp1.shift();
        temp1.pop();
        temp1.forEach(function (item) {
            temp.push({
                key: item,
                label: item
            });
        });
        return temp;
    }

    return (
        <div>
            {
                profile && <Templeate columns={handleCol()} rows={handleRow()} profile={profile} />
            }

            {
                !profile && <Skel />
            }
        </div>
    );
};

export default Profile;
