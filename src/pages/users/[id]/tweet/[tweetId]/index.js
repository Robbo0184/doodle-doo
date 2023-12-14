import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";





export default function TweetPage() {
    const router = useRouter();
    const { tweetId } = router.query;
    const { data: tweet } = useSWR(`/api/tweets/${tweetId}`);

    sessionStorage.setItem('currentTweetId', tweetId);

   console.log("Logging tweet", tweet);
    
    return (
        <>
            <main id="tweetPageMain">
                <div id="tweetPageHomepageLinkContainer">
                <Link href={`/?tweetId=${tweetId || ''}`}>Back To Main Feed</Link>                </div>
                <div id="tweetPageImageContainer">
                    <Image alt="image" src={tweet?.image} height={600} width={600}></Image>
                </div>
            </main>
        </>
    )
}
