import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";





export default function ImagePage(){
    const router = useRouter();
    const { id, tweetId } = router.query; 
    const {data: tweet} = useSWR(`/api/tweets/${tweetId}`);
    



    return(
        <>
               
               <Image alt="image" src={tweet?.image} height={600} width={600}></Image>
        </>
    )
}
