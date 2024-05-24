import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../../../components/navbar/navbar";
import Head from "next/head";
import Link from "next/link";

export default function FollowingPage() {
    const router = useRouter();
    const { id: userId } = router.query
    const { data: user } = useSWR(`/api/users/${userId}`) 

    const following = user?.following

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <main className="following--page--main">
                <h2 id="followingPageFollowingHeading">Follows</h2>

                <div id="followingPageFollowingContainer">
                    {following?.map((followee, index) => (
                        <Link href={`/users/${followee._id}`} key={index} className="following--page--profile--link">
                            <div key={index} className="followee-item">
                                <Image src={followee.image} alt={followee.name} style={{ borderRadius: '50px' }} width={60} height={60} />
                                <p>{followee.name}</p>
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