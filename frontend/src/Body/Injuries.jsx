import React from 'react';
import Templeate from './Templeate';
import Skel from './Skel';
const Injuries = ({ profile }) => {

    function handleRow() {
        let temp = []

        let i = 1

        profile.result.slice(1).forEach(function (item) {
            temp.push({
                key: i,
                Season: item[0],
                Injury: item[1],
                From: item[2],
                until: item[3],
                Days: item[4],
                "Games missed": item[5]
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
                key: "Injury",
                label: "Injury"
            },
            {
                key: "From",
                label: "From"
            },
            {
                key: "until",
                label: "until"
            },
            {
                key: "Days",
                label: "Days"
            },
            {
                key: "Games missed",
                label: "Games missed"
            }
        ];

        return temp;
    }

    return (
        <div>
            {profile &&
                <Templeate columns={handleCol()} rows={handleRow()} profile={profile} />
            }

            {!profile && <Skel />
            }
        </div>
    );
}
export default Injuries;
