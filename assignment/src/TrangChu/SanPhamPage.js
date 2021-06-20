import React, { useState, useEffect } from 'react';import Grid from '@material-ui/core/Grid';
import SanPham from './SanPham.js';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
     
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
   
  
  }));
  

export default function SanPhamPage(props) {
    const {openDialog} = props;
    const classes = useStyles();
    const [dataSanPham,setDataSanPham] = useState([]);
    const [danhMuc,setDanhMuc] = useState([]);
    // pagination
  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const [countPage,setCountPage] = useState(0);

  // backdrop
  const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        setOpen(true);
        axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/sanPham?page='+page+'&limit='+limit).then((response) => {
          
          setDataSanPham(response.data);
          setOpen(false);
        });
        
      },[page]);
      useEffect(()=>{
        setOpen(true);
        axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/danhMuc').then((response) => {
          setDanhMuc(response.data);
          setOpen(false);
        });
        
      },[]);

      const handleChangePage = (event) => {
        if(event.target.innerText != undefined){
          setPage((Number(event.target.innerText)));
        }
        
       
      };
     

      useEffect(()=>{
        setOpen(true);
        axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/sanPham').then((response) => {
          
          setCountPage(Math.floor(response.data.length / limit) +1);
          setOpen(false);
        });
        
    
      },[]);

      function handleClick(event,value) {
        event.preventDefault();
        
         
          axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/sanPham?idDanhMuc='+value.id).then((response) => {
            
              setDataSanPham(response.data);
              setPage(0);
              setCountPage(0);
          });
          
        
       };


     
  return (

    <Grid container spacing={4}>
      <Grid item md={12}>
      <Breadcrumbs aria-label="breadcrumb">
        {danhMuc.map((v,i) =>{
          return(<Link color="inherit" key={i} onClick={(e)=>{handleClick(e,v)}}>
          { v.tenDanhMuc}
       </Link>);
            
        })}
      </Breadcrumbs>
      </Grid>
            {dataSanPham.map((data,i) => (
              <SanPham key={i} SP={data} openDialog={openDialog} />

            ))}
            <Grid item md={12}>
            <Pagination count={countPage} color="primary" onClick={handleChangePage} page={page}/>
            </Grid>


        <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
    </Grid>
      
  );
}

