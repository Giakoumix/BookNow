
import React, {useState, useEffect} from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AdminHostsAwaiting = ({result}) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [trigger, setTrigger] = useState(true)
    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(result)
    }, [rows, trigger])

    const handleCheckboxClick = (event, id) => {
        if (event.target.checked) {
          setSelectedItems([...selectedItems, id]);
        } else {
          setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        }
      };
    
    const handleDeleteSelectedItems = async (id) => {
        // Create a new array without the selected items
        const updatedRows = result.filter((row) => !selectedItems.includes(row.id));
    
        // Update the state with the new array
        // setRows(updatedRows);
        let response = await fetch(`http://127.0.0.1:8000/auth/delete_host_awaiting/${id}`, {
            method: 'DELETE'
        })
        
        setRows(updatedRows)
        setTrigger(!trigger)
        // Clear the selected items
        setSelectedItems([]);
      };
    
      const handleAcceptSelectedItems = async (id) => {
        const updatedRows = result.filter((row) => !selectedItems.includes(row.id)); 

        let response = await fetch(`http://127.0.0.1:8000/auth/insert_host_awaiting`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'id': id})
        })

        handleDeleteSelectedItems(id)
        setTrigger(!trigger)
        setRows(updatedRows)
        setSelectedItems([]);
      }

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell 
                        checked={selectedItems.length === result.length}
                        onChange={(event) => {
                            if (event.target.checked) {
                                setSelectedItems(result.map((row) => row.host_awaiting_id))
                            }
                            else {
                                setSelectedItems([])
                            }
                        }}
                    >
                        Host Awaiting ID
                    </TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Password</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Host Location</TableCell>
                    <TableCell align="right">Host About</TableCell>
                    <TableCell align="right">Host Neighbourhood</TableCell>
                    <TableCell align="right">Host Verifications</TableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {result.map((row, index) => (
                    <TableRow
                    key={row.host_awaiting_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <Checkbox 
                            checked={selectedItems.includes(row.host_awaiting_id)}
                            onChange={(event) => handleCheckboxClick(event, row.host_awaiting_id)}
                            /> 
                            {row.host_awaiting_id}
                    </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.password}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.image}</TableCell>
                    <TableCell align="right">{row.host_location}</TableCell>
                    <TableCell align="right">{row.host_about}</TableCell>
                    <TableCell align="right">{row.host_neighbourhood}</TableCell>
                    <TableCell align="right">{row.host_verifications}</TableCell>
                    
                    <Tooltip>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteSelectedItems(row.host_awaiting_id)}
                            disabled={!selectedItems.includes(row.host_awaiting_id)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Tooltip>

                    <Tooltip>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAcceptSelectedItems(row.host_awaiting_id)}
                            disabled={!selectedItems.includes(row.host_awaiting_id)}
                        >
                            <AddCircleIcon></AddCircleIcon>
                        </Button>
                    </Tooltip>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
        
    )
}

export default AdminHostsAwaiting