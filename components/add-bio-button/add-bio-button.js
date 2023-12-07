import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";

const StyledButton = styled.button`
border: none;
border-radius: 5px;
color: white;
font-size: rem;
background: linear-gradient(135deg, #4e54c8, #8f94fb);
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}
`

export default function AddBioButton({onClick}){
   
    const router = useRouter();
    const { id: userId } = router.query
    const { data: user, mutate, error } = useSWR(userId ? `/api/users/${userId}` : null);

    return(
        <>
        
            <StyledButton
            className="bio--button"
            onClick={onClick}
            >
            {user?.bio?.length > 0 ? 'Edit Bio' : 'Add Bio'}
            </StyledButton>
       
        </>
    )
}