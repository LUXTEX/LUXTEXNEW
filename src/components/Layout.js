
import Header from "./Header";

import Footer from "./Footer";

import Router from "next/router";
import NProgress from "nprogress";


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  
  return (
 
   <>
    <Header />
        <div className="wrapper">
          
         
        
          {props.children}
          <Footer />
        </div>
        </>
  );
};

export default Layout;
