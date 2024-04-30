import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../../../../../components/navbar/navbar";
import Head from "next/head";
import Link from "next/link";



export default function LikesPage() {
    const router = useRouter();
    const { id: userId, tweetId } = router.query
    const { data: tweet } = useSWR(`/api/tweets/${tweetId}`);
    const likes = tweet?.likes
    


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className="likes--page--main">

                <h2 id="likesPageLikedByHeading">Liked by</h2>
                
                <div id="likesPageLikesContainer">
                {likes?.map((like, index) => (
                    <Link href={`/users/${like._id}`} key={index} className="likes--page--profile--link">
                    <div key={index} className="like-item">
                        <Image src={like.image} alt={like.name} style={{ borderRadius: '50px' }} width={60} height={60} />
                        <p>{like.name}</p>
                    </div>
                    </Link>
                ))}
            </div>




                <Navbar>
                </Navbar>
            </main>
        </>
    )
}