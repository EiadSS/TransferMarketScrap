import React from 'react';
import Templeate from './Templeate';
import Skel from './Skel';

const Stats = ({ profile }) => {
    function handleRow() {
        let temp = []

        let i = 1

        profile.body.forEach(function (item) {
            temp.push({
                key: i,
                Season: item[0],
                Competition: item[1],
                Club: item[2],
                Appearances: item[3],
                Goals: item[4],
                Assists: item[5],
                "YYRR": item[6],
                Minutes: item[7],
            });
            i++;
        });
        return temp;
    }


    function handleCol() {
        if (!profile) return []; // Handle case where profile is not yet fetched
        let temp = [];
        profile.header.forEach(function (item) {
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
}
export default Stats;
