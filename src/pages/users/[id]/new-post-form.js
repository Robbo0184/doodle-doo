
import Navbar from "../../../../components/navbar/navbar";

export default function NewPostForm() {

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        onSubmit(data);
        console.log(data);
    }

    return (
        <>
        <form>
        <textarea placeholder="And.....?">
        </textarea>
        <button>Submit</button>
        </form>
        <Navbar />
        </>
    )

}