import styled from "styled-components";
import homeIcon from "../../public/assets/home-nav-icon.svg";
import Link from "next/link";
import Image from "next/image";


export default function HomeNavIcon () {
    return (
         <Link href={"/"}>
         <Image src={homeIcon} alt="Home-icon"/>
         </Link>
    )
}