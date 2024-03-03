import React from 'react';
import Templeate from './Templeate';
import Skel from './Skel';

const Transfers = ({ profile }) => {

    function handleRow() {
        let temp = []

        let i = 1
        let toLoop = profile.result
        toLoop.shift()

        toLoop.forEach(function (item) {
            temp.push({
                key: i,
                Season: item[0],
                Date: item[1],
                Left: item[2],
                Joined: item[3],
                "Market Value": item[4],
                Fee: item[5]
            });
            i++;
        });
        return temp;
    }


    function handleCol() {
        if (!profile) return []; // Handle case where profile is not yet fetched
        let temp = [
            {
                key: "Season",
                label: "Season"
            },
            {
                key: "Date",
                label: "Date"
            },
            {
                key: "Left",
                label: "Left"
            },
            {
                key: "Joined",
                label: "Joined"
            },
            {
                key: "Market Value",
                label: "Market Value"
            },
            {
                key: "Fee",
                label: "Fee"
            }
        ];

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
}
export default Transfers;
