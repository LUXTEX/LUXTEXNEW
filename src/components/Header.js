import Nav from "./Nav";
import React, { useState, useEffect } from "react"
const Header = () => {
	const [scroll, setScroll] = useState(false);
	useEffect(() => {
	  window.addEventListener("scroll", () => {
		setScroll(window.scrollY > 100);
	  });
	}, []);
	return (
		<>
<div
  className={
    scroll
      ? " backdrop-blur-14 w-full fixed z-50 duration-500 ease-in-out py-0 shadow top-0"
      : "backdrop-blur-14 w-full fixed duration-500 ease-in-out shadow top-0"
  }
>
  <Nav />
</div>

		</>
	)
};

export default Header;
