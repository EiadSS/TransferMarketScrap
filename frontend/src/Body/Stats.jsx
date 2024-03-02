import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, Skeleton } from "@nextui-org/react";

const Stats = ({ player, setLoad }) => {
    const [profile, setProfile] = useState(null); // Initialize profile state properly

    useEffect(() => {
        fetchData();
    }, [player]);

    async function fetchData() {
        setProfile(null)
        try {
            const response = await fetch('http://127.0.0.1:8000/app/stats/' + player);
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
        
        console.log(temp)

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
        
        console.log(temp)
        
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
};

export default Stats;
