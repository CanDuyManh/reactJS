import React, { useState, useEffect } from 'react';import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
     
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    Paper: {
      margin: theme.spacing(5),
      padding: theme.spacing(2)
    },
    Paper2: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
      
    },
    cardMedia: {
      width: 160,
    },
    Button:{
      textAlign:"center"
    },
   
  
  }));

  
  

export default function SanPhamPage(props) {
  const{openDialog} = props;
    const classes = useStyles();
    const [dataSanPham,setDataSanPham] = useState([]);
      
  // backdrop
  const [open, setOpen] = React.useState(false);
   

    useEffect(()=>{
      setOpen(true);
      axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/gioHang').then((response) => {
        setDataSanPham(response.data);
        setOpen(false);
      });
    },[]);

    function tinhTien(){
      let numble = 0;
      dataSanPham.map((v)=>(numble =Number(numble) + Number(v.gia)));
      return numble;
    }
    function getTenSP(){
      let name = [];
      name = dataSanPham.map((v)=>{
        console.log(v);
        return v.ten;
      });
      console.log(name);
      return name ;
    }


    const onDelete = (e , index) =>{
      
      setOpen(true);
      setDataSanPham((oldState) => {
        let newState = oldState.filter((value, idx) => {
          return value.id == index ? false : true;
        });
  
        return newState;
      });
      
      axios.delete('https://600e77453bb1d100179df350.mockapi.io/api/product/gioHang/'+index);
      setOpen(false);
      openDialog('Xóa Thành Công !');
      
    } 

    const thanhToan = ()=>{
      setOpen(true);
      axios.post('https://600e77453bb1d100179df350.mockapi.io/api/product/oder',{id:'',tenSP:getTenSP(),soLuong:dataSanPham.length,tongTien:tinhTien()});
      dataSanPham.map((v) =>{
        try {
          axios.delete('https://600e77453bb1d100179df350.mockapi.io/api/product/gioHang/'+v.id); 
        } catch (error) {
          
        }   
      });
      setTimeout(()=>{setDataSanPham([]) ; setOpen(false);},3000);
      openDialog('Thanh Toán Thành Công !');
      
    }


  return (
    <React.Fragment>
      <Paper elevation={3} className={classes.Paper}>
        <Grid container spacing={4}>
        <Grid item md={6}>
              <Typography align='center'>Sản Phẩm</Typography>
          </Grid>
        <Grid item md={3}>
              <Typography align='center'>Giá</Typography>
        </Grid>  
        <Grid item md={3}>
              <Typography align='center'>Thao Tác</Typography>
        </Grid> 
          
        </Grid>
      </Paper>

    <Divider></Divider>
    {dataSanPham.map((v,i)=>(
      <Paper elevation={3} className={classes.Paper2} key={i}>
        <Grid container spacing={4}>
        <Grid item md={6}>
              <Typography align='center'>{v.ten}</Typography>
        </Grid>
        <Grid item md={3}>
              <Typography align='center'>{v.gia} $</Typography>
        </Grid>  
        <Grid item md={3} className={classes.Button} >
              <Button color="secondary" onClick={(event) => {onDelete(event,v.id)}} ><Typography align='center'>Delete</Typography></Button>
        </Grid> 
          
        </Grid>
      </Paper>
      
    ))}
    <Divider></Divider>
    <Paper elevation={3} className={classes.Paper}>
        <Grid container spacing={4}>
        <Grid item md={6}>
             
          </Grid>
        <Grid item md={3}>
    <Typography align='center'>{tinhTien()}.00 $</Typography>
        </Grid>  
        <Grid item md={3} className={classes.Button} >
              <Button color="secondary" onClick={thanhToan} ><Typography align='center'>Thanh Toán</Typography></Button>
        </Grid> 
          
        </Grid>
      </Paper>
      
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
       
    </React.Fragment>
  
      
  );
}

