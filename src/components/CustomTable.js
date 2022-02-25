import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fetchApi from '../API/api';
import TablePaginationActions from './TablePaginationActions';
import EditableRow from './EditableRow';

function CustomPaginationActionsTable() {
    const [rows, setRows] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    useEffect(() => {
        fetchApi(setRows, setLoading);
    }, [])

    const [changeEveryId, changeEveryIdSwitch] = React.useState(true);
    const [changeSingleId, changeSingleIdSwitch] = React.useState(false);
    const [rowUrl, setRowUrl] = React.useState();

    useEffect(() => {
        const timer = setInterval(() => {
            if (changeSingleId) {
                changeRowIdInGivenTime()
            } else if (changeEveryId) {
                changeAlLRowsIdRandomly();
            }
        }, 2000)
        return () => clearInterval(timer)
    })

    const removeRow = (e, rowId) => {
        e.stopPropagation()
        const modifiedRows = rows.filter((value) => value.id != rowId);
        setRows(modifiedRows);
    }
    const editRow = (rowString, rowId) => {
        const editedRow = rows.map(el => el.id == rowId ? { ...el, title: rowString } : el);
        setRows(editedRow);
    }
    const randomId = () => Math.floor(Math.random() * (1000000 - 1) + 1);

    const changeAlLRowsIdRandomly = () => {
        const newRandomIds = rows.map(el => ({ ...el, albumId: randomId(), id: randomId() }));
        setRows(newRandomIds);
    }

    const changeRowIdInGivenTime = () => {
        const randomRowIds = rows.map(el => el.url == rowUrl ? { ...el, albumId: randomId(), id: randomId() } : el);
        setRows(randomRowIds);
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) return "LOADING...";
    if (error) return "Error!";
    if (rows)
        return (
            <div onClick={(e) => {
                e.stopPropagation();
                if (changeSingleId) {
                    changeSingleIdSwitch(!changeSingleId)
                } else if (changeEveryId) {
                    changeEveryIdSwitch(!changeEveryId);
                } else {
                    changeEveryIdSwitch(!changeEveryId);
                }
            }} >
                <TableContainer style={{ margin: '40px auto', textAlign: 'center', width: '66%' }} component={Paper} onClick={(e) => { e.stopPropagation() }}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="center">Album ID</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.id} onClick={(e) => {
                                    e.stopPropagation();
                                    setRowUrl(row.url);
                                    if (row.url != rowUrl || row.url == rowUrl && changeEveryId) {
                                        changeSingleIdSwitch(true);
                                        changeEveryIdSwitch(false);
                                    } else if (!changeEveryId && !changeSingleId && row.url == rowUrl) {
                                        changeSingleIdSwitch(true);
                                    } else {
                                        changeSingleIdSwitch(false);
                                        changeEveryIdSwitch(true);
                                    }
                                }}>
                                    <EditableRow row={row} editRowFunction={editRow} />
                                    <TableCell align="right">
                                        <Button onClick={(e) => { removeRow(e, row.id) }} variant="outlined" color="error">Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[20, 10, 5, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        );
}

export default CustomPaginationActionsTable;