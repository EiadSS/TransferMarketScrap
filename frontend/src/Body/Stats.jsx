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
                Appearances: item[2],
                Goals: item[3],
                Assists: item[4],
                "Y-YR-R": item[5],
                Minutes: item[6],
            });
            i++;
        });
        return temp;
    }


    function handleCol() {
        if (!profile) return []; // Handle case where profile is not yet fetched

        return (
            [
                {
                    key: "Season",
                    label: "Season"
                },
                {
                    key: "Competition",
                    label: "Competition"
                },
                {
                    key: "Appearances",
                    label: "Appearances"
                },
                {
                    key: "Goals",
                    label: "Goals"
                },
                {
                    key: "Assists",
                    label: "Assists"
                },
                {
                    key: "Y-YR-R",
                    label: "Y-YR-R"
                },
                {
                    key: "Minutes",
                    label: "Minutes"
                },
            ]
        )
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
