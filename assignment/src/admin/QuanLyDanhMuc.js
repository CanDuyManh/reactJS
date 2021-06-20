import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import TableDanhMuc from './TableDanhMuc.js';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root2: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  root3: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%' ,
      
    },
    marginTop: 100,
    marginLeft : 100,
  }
  ,
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      
    },
    marginTop: 100,
    marginLeft : 100,
  }
  ,divider: {
    height: 28,
    margin: 4,
  },
  tablex : {
    marginTop : 100,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
 

}));

export default function QuanLyDanhMuc(props) {
  const {openDialog} =props;
  // product
  const classes = useStyles();
  const [clicked,setClicked] = useState(-1);
  const [sanPham,setSanPham] = useState({id:0 , tenDanhMuc:'',});

  // pagination
  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(5);
  const [countPage,setCountPage] = useState(0);

  // backdrop
  const [open, setOpen] = React.useState(false);

  const onChangeTexfield = (e) => {
    const{  name,value  } = e.target;
    setSanPham({
      ...sanPham,
      [name]: value,
    });
    
  }
  const handleChangePage = (event) => {
    if(event.target.innerText != undefined){
      setPage((Number(event.target.innerText)));
    }
    
   
  };
  useEffect(()=>{
    setOpen(true);
    axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/danhMuc?page='+page+'&limit='+limit).then((response) => {
      
      setDataSanPham(response.data);
      setOpen(false);
    });
    
  },[page]);
  
  const [dataSanPham,setDataSanPham] = useState();
  useEffect(()=>{
    setOpen(true);
    axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/danhMuc').then((response) => {
      
      setCountPage(Math.floor(response.data.length / limit) +1);
      setOpen(false);
    });
    

  },[]);
  function clearForm(){
    setSanPham({id:0 , tenDanhMuc:''});  
    setClicked(-1);
    
    }
  
  const saveSanPham = ()=>{
    
    setDataSanPham((oldState) => {
      let newState;

      if (clicked != -1) {
        newState = oldState.map((value, index) => { 
          return index == clicked ? sanPham : value;
        });
        axios.put('https://600e77453bb1d100179df350.mockapi.io/api/product/danhMuc/'+sanPham.id , sanPham);
        openDialog('Sửa Thành công !');
      } else {
        newState = [
          ...oldState,
          {id:'',tenDanhMuc:sanPham.tenDanhMuc}

        ];
        axios.post('https://600e77453bb1d100179df350.mockapi.io/api/product/danhMuc', sanPham);
        openDialog('Thêm Thành công !');
      }

      return newState;
    });
  }
  const OnSearch = (event)=>{
    try {
      
    let string = event.target.value;  
    axios.get('https://600e77453bb1d100179df350.mockapi.io/api/product/danhMuc?search='+string).then((response)=>{
      setDataSanPham(response.data);
    });
    } catch (error) {
      
    }
    
  }

  return (
    <div>
    <form className={classes.root} noValidate autoComplete="off">
      <Paper component="form" className={classes.root2}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={OnSearch}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" >
        <SearchIcon />
      </IconButton>
     
    </Paper>
      <br></br>
      <TextField  disabled id="standard-basic" label="ID" value={sanPham.id} />
      <TextField id="standard-basic" value={sanPham.tenDanhMuc} name='tenDanhMuc' label="Tên Danh Mục" onChange={onChangeTexfield}  />
      <br></br>
      <Button variant="contained" color="primary" onClick={saveSanPham}>
        submit
      </Button>
      <Button variant="contained" color="primary" onClick={clearForm}>
        Claer
      </Button>

    </form>
    <form className={classes.root3} noValidate autoComplete="off">
    <TableDanhMuc
     dataSanPham = {dataSanPham}
     setDataSanPham = {setDataSanPham}
     sanPham = {sanPham}
     setSanPham = {setSanPham}  
     setClicked = {setClicked}
     clearForm={clearForm}
     openDialog ={openDialog}
    >   
      </TableDanhMuc>
    <Pagination count={countPage} color="primary" onClick={handleChangePage} page={page}/>
    </form>
    <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}