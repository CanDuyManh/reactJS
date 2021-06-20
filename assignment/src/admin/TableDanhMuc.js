import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';


var rows = [];




const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bodyTable :{
    maxWidth : 900,
  },
});





export default function BasicTable(props) {
    
   
    if(props.dataSanPham != undefined){
        rows = props.dataSanPham;
    }

    const handleOnClick = (e,value , index) =>{
    
      props.setSanPham(value);
      props.setClicked(index);
    };
  
    const onDelete = (e , index) =>{
  
      
      props.setDataSanPham((oldState) => {
        let newState = oldState.filter((value, idx) => {
          return value.id == index ? false : true;
        });
  
        return newState;
      });
  
     
      let ixx = index;
      props.clearForm();
      axios.delete('https://600e77453bb1d100179df350.mockapi.io/api/product/danhMuc/'+ixx);
      props.openDialog('xoá thành công !');
      
    }
  
  const classes = useStyles();
  
  return (
    <TableContainer component={Paper} className={classes.bodyTable}>
      <Table  className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Tên Danh Mục</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={index} onClick={(event) => {
              handleOnClick(event,row,index)
            }}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.tenDanhMuc  }</TableCell>  
              <TableCell style={{ width: 160 }} align="left">
              <Button color="secondary" onClick={(event) => {onDelete(event,row.id)}} >DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}