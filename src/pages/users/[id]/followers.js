import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../../../components/navbar/navbar";
import Head from "next/head";
import Link from "next/link";


export default function FollowersPage() {
    const router = useRouter();
    const { id: userId } = router.query
    const { data: user } = useSWR(`/api/users/${userId}`)

    const followers = user?.followers


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <main className="followers--page--main">
                <h2 id="followersPageFollowedByHeading">Followed by</h2>

                <div id="followersPageFollowersContainer">
                    {followers?.map((follower, index) => (
                        <Link href={`/users/${follower._id}`} key={index} className="follower--page--profile--link">
                            <div key={index} className="follower-item">
                                <Image src={follower.image} alt={follower.name} style={{ borderRadius: '50px' }} width={60} height={60} />
                                <p>{follower.name}</p>
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