import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import SanPhamPage from './SanPhamPage.js';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GioHangPage from './GioHangPage';
import DonHangPage from './DonHangPage';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory 
  
  
} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Home', url: '/' },
    { title: 'Sản Phẩm', url: '/sanPham' },
    { title: 'Giỏ Hàng', url: '/gioHang' },
    { title: 'Đơn Hàng', url: '/donHang' },
];

const mainFeaturedPost = {
  title: 'Đây Không Phải Là Web Bán Giày',
  description:
    "Đây không phải là web bán giày, cũng không phải là web bán quần áo, vậy chúng tôi bán gì ?????",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Điều Thứ Nhất',
    date: 'No. 1',
    description:
      'Bạn mua hàng của chúng tôi, Tôi không chắc nó sẽ giúp bạn trở nên đẹp hơn.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Điều Thứ Hai',
    date: 'No. 2',
    description:
      'Bạn mua hàng của chúng tôi, điều đó không thể hiện bạn là 1 người giàu có.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Nếu bạn đã đọc đến đầy thì chắc bạn đã biết đây không phải là About, chúng tôi chỉ muốn nói "tuyển gấp marketing sale !".',
  archives: [
    { title: 'Home', url: '/' },
    { title: 'Sản Phẩm', url: '/sanPham' },
    { title: 'Giỏ Hàng', url: '/gioHang' },
    { title: 'Đơn Hàng', url: '/donHang' },
    
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog(props) {
  const {user , setUser ,openDialog} = props;
  let history = useHistory();
  const classes = useStyles();




  const openLogin =()=>{
    history.push('./login');

  }
  

  return (
    <Router>
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Hiếu PC đã ghé qua" sections={sections} openLogin={openLogin} user={user} />
        <main>
        <Switch>
        
        <Route path="/sanPham">
          <SanPhamPage openDialog={openDialog}></SanPhamPage>
        </Route>
        <Route path="/gioHang">
        <GioHangPage openDialog={openDialog}></GioHangPage>
        </Route>
        <Route path="/donHang">
        <DonHangPage></DonHangPage>
        </Route>
        <Route path="/" >
        <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
              
            />
          </Grid>
        </Route>
      </Switch>
        </main>
      </Container>
      <Footer title="Manhcdph11373" description="Code 3 giờ mỗi ngày sẽ ảnh hưởng xấu tới sức khỏe của bạn!" />
    </React.Fragment>
    
    
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      
    
  </Router>
    
  );
}