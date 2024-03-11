import React from 'react';
import Templeate from './Templeate';
import Skel from './Skel';

const Transfers = ({ profile }) => {

    function handleRow() {
        let temp = []

        let i = 1
        profile.body.forEach(function (item) {
            temp.push({
                key: i,
                Date: item[0],
                "From": item[1],
                "To": item[2],
                "Market Value": item[3],
                Fee: item[4]
            });
            i++;
        });
        return temp;
    }


    function handleCol() {
        if (!profile) return []; // Handle case where profile is not yet fetched
        let temp = [
            {
                key: "Date",
                label: "Date"
            },
            {
                key: "From",
                label: "From"
            },
            {
                key: "To",
                label: "To"
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
