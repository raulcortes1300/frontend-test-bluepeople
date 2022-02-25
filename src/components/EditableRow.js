import React from 'react';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';




const EditableRow = ({ row, editRowFunction }) => {
    const [isRowEditable, makeRowEditable] = React.useState(false);

    const [rowTitle, setRowTitle] = React.useState(row.title);
    const handleChange = (e) => {
        setRowTitle(e.target.value);
    };
    const rowId = row.id;
    const applyEditRow = (e) => {
        e.stopPropagation();
        makeRowEditable(!isRowEditable);
        editRowFunction(rowTitle, rowId);
    }
    const allowRowEdition = (e) => {
        e.stopPropagation()
        makeRowEditable(!isRowEditable)
    }
    return (
        <>
            <TableCell component="th" scope="row">
                {!isRowEditable ?
                    <TextField
                        disabled
                        fullWidth
                        id="outlined-disabled"
                        value={rowTitle}
                    /> : <TextField
                        fullWidth
                        id="outlined-disabled"
                        value={rowTitle}
                        onChange={handleChange}
                        onClick={(e) => { e.stopPropagation() }}
                    />}
            </TableCell>
            <TableCell align="center">
                {row.albumId}
            </TableCell>
            <TableCell align="center">
                {row.id}
            </TableCell>
            <TableCell align="center">
                <a href={row.url}><img src={row.thumbnailUrl} /></a>
            </TableCell>
            <TableCell align="right">
                {!isRowEditable ?
                    <Button variant="contained" onClick={(e) => allowRowEdition(e)}>Edit</Button> :
                    <Button variant="contained" onClick={(e) => applyEditRow(e)} startIcon={<SaveIcon />} color="secondary">Done</Button>}
            </TableCell>
        </>
    );
}

export default EditableRow