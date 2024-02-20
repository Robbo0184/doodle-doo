import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import LikeButton from "../../../../../../components/like-button/like-button";
import { handleToggleLikes } from "@/utils/handleToggleLikes";

export default function TweetPage() {
    const router = useRouter();
    const { id: userId, tweetId } = router.query; 
    const { data: tweet } = useSWR(`/api/tweets/${tweetId}`);
    console.log("Logging tweet.likes", tweet?.likes);
    sessionStorage.setItem('currentTweetId', tweetId);

    return (
        <>
            <main id="tweetPageMain">
                <Link id="tweetPageLink" href={`/?tweetId=${tweetId || ''}`}>Back To Main Feed</Link>
                <div id="tweetPageTweetContainer">

                    {
                        tweet?.image &&
                        <div id="tweetPageImageContainer">
                            <Image id="tweetPageImage" alt="image" src={tweet?.image} height={600} width={600}></Image>
                        </div>
                    }

                    {
                        tweet?.tweet &&
                        <div className={!tweet?.image ? "center-tweet-container" : "tweetPageTweetTextContainer"}>
                            <p id="tweetPageTweetText">{tweet?.tweet}</p>
                        </div>

                    }
                    
                    <LikeButton
                    className="like--button"
                    isLiked={tweet?.likes.includes(userId)}
                    tweetId={tweet?.tweet._id}
                    handleToggleLikes={() => handleToggleLikes(tweet._id)}
                  />
                    </div>
            </main>
        </>
    )
}
