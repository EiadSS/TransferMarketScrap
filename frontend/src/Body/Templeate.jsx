import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const Templeate = ({columns, rows, profile}) => {
    return (
        <div>
            {profile && (
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )
            }

        </div>
    );
}

export default Templeate