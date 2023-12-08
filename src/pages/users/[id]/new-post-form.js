import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import DoodleDooLogo from "../../../../public/assets/hen.png"
import Navbar from "../../../../components/navbar/navbar";
import { useState } from "react";
import SubmitButton from "../../../../components/new-post-form-submitbutton/new-post-form-submitbutton";

export default function NewPostForm() {
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const router = useRouter()
    const { id: userId } = router.query
    const { mutate, data } = useSWR(`/api/users/${userId}`);
    const [tweet, setTweet] = useState("");

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    async function handleSubmitTweet(event) {
        event.preventDefault();
        const userData = data;

        if (!userData) {
            console.error("User data not available");
            return;
        }
        const userName = userData.name;
        const formData = new FormData(event.target);
        const tweetContent = formData.get('tweet');
        const imageFile = formData.get('imageUpload');

        const tweetData = {
            tweet: tweetContent,
            userName: userName,
        };

        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tweetData.date = currentDate;

        if (imageFile) {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('file', imageFile);
            cloudinaryFormData.append('upload_preset', "gbq60g6f")

            try {
                const cloudinaryData = await fetch('https://api.cloudinary.com/v1_1/dlz1zhocz/image/upload', {
                    method: 'POST',
                    body: cloudinaryFormData
                }).then(response => response.json())

                setImageSrc(cloudinaryData.secure_url);
                setUploadData(cloudinaryData);

                tweetData.image = cloudinaryData.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
            }

            setTweet('');

            const response = await fetch(`/api/users/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tweetData),
            });

            if (response.ok) {
                mutate();
            } else {
                console.error(`Error: ${response.status}`);
            }

            router.push(`/users/${userId}`);

        }
    }

    return (
        <>
            <div id="imageDiv">
                <Image src={DoodleDooLogo} width={140} alt="logo"></Image>
            </div>
            <div id="formContainer">
                <form method="post" onSubmit={handleSubmitTweet}>
                    <textarea
                        id="newPostFormTextArea"
                        name="tweet"
                        value={tweet}
                        placeholder="whats on your mind?"
                        onChange={(e) => setTweet(e.target.value)}
                    ></textarea>
                    <div id="formButtonsAndImagePreviewDiv">
                        <label htmlFor="imageUpload" className="custom-file-upload">
                            Choose Image
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            name="imageUpload"
                            onChange={handleOnChange}
                            accept="image/*"></input>
                        {imageSrc &&
                            <Image className="image--preview" src={imageSrc} width={200} height={150} alt="image-preview" />
                        }
                        <SubmitButton type="submit">Submit</SubmitButton>
                    </div>
                </form>
            </div>
            <Navbar />

        </>
    );

}