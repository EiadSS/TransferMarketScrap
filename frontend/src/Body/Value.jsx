import React from 'react';
import Templeate from './Templeate';
import Skel from './Skel';

const Value = ({ profile }) => {

    function handleRow() {
        let temp = []
        let i = 1
        let toLoop = profile.result
        toLoop.forEach(function (item) {
            delete item.clubID
            item["key"] = i
            temp.push(item);
            i++;
        });
        return temp;
    }


    function handleCol() {
        if (!profile) return []; // Handle case where profile is not yet fetched
        let temp = [
            {
                key: "age",
                label: "Age"
            },
            {
                key: "date",
                label: "Date"
            },
            {
                key: "club Name",
                label: "Club Name"
            },
            {
                key: "value",
                label: "Value"
            }
        ];

        return temp;
    }

    return (
        <div>
            {profile &&

                <Templeate columns={handleCol()} rows={handleRow()} profile={profile} />
            }
            {
                !profile &&
                <Skel />
            }
        </div>
    );
}
export default Value;
