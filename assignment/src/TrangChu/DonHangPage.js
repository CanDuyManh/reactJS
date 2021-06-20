import React, { useState, useEffect } from 'react';import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles((theme) =>( {
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
function getTenSP(arr){
   let name = '';
   for(var i=0;i<3;i++){
       if(arr[i] != undefined){
         name=name+arr[i]+', ';
       }
    
   }
   if(arr.length > 3){
    return name + ', ...';
   }else{
    return name;
   }
   
}



export default function BasicTable() {
  const classes = useStyles();
    // backdrop
    const [open, setOpen] = React.useState(false);
    const [dataSanPham,setDataSanPham] = useState([]);
    useEffect(()=>{
        setOpen(true);
        axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/oder').then((response) => {
          setDataSanPham(response.data);
          setOpen(false);
        });
      },[]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sản Phẩm</TableCell>
            <TableCell align="right">Số Lượng</TableCell>
            <TableCell align="right">Tổng Tiền</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSanPham.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {getTenSP(row.tenSP)}
              </TableCell>
              <TableCell align="right">{row.soLuong}</TableCell>
              <TableCell align="right">{row.tongTien} .00$</TableCell>
              <TableCell align="right">Đang Vận Chuyển</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </TableContainer>
  );
}