import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, Skeleton } from "@nextui-org/react";

const Injuries = ({ player, setLoad }) => {
    const [profile, setProfile] = useState(null); // Initialize profile state properly

    useEffect(() => {
        fetchData();
    }, [player]);

    async function fetchData() {
        setProfile(null)
        try {
            const response = await fetch('http://127.0.0.1:8000/app/injuries/' + player);
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            const result = await response.json();
            setProfile(result);
            setLoad(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function handleRow() {
        let temp = []

        let i = 1
        let toLoop = profile.result
        toLoop.shift()

        toLoop.forEach(function (item) {
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
            {profile && (
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={handleCol()}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={handleRow()}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )
            }

            {!profile && (
                <Card className="profile-skel" radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
            )
            }
        </div>
    );
}
export default Injuries;
