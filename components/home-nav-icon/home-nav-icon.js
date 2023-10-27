import styled from "styled-components";
import homeIcon from "../../public/assets/home-nav-icon.svg";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from "../../public/assets/home.png"

export default function HomeNavIcon () {
    return (
         <Link href={"/"}>
         <Image src={HomeIcon} width={100} alt="Home-icon"/>
         </Link>
    )
}