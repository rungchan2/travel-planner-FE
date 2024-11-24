import { useAuth } from '@/lib/AuthContext.tsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { signOut } from '@/components/login/auth.ts';

export default function Profile() {
	const { user, email, displayName, photoURL } = useAuth();
	const [ view, setView ] = useState(false);
	
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.profile-drop, .profile-container')) {
				setView(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	
	
	const ProfileDetail = () => {
		return (
			<>
				<li className="name">{ displayName }</li>
				<li>{ email }</li>
				<li><LogoutStyles onClick={ signOut }>로그아웃</LogoutStyles></li>
			</>
		
		);
	};
	
	return (
		<ProfileContainer className="profile-container">
			
			<ProfileStyled onClick={ () => setView(!view) }>
				{ user ?
					(<img src={ photoURL || '' } alt="" />)
					:
					(<ProfileStyled />)
				}
			</ProfileStyled>
			{ user && view &&
				(
					<ProfileDropdown className="profile-drop">
						<ProfileDetail />
					</ProfileDropdown>
				)
			}
		
		</ProfileContainer>
	);
}

const LogoutStyles = styled.a`
    cursor: pointer;
    color: #999;

    &:hover {
        text-decoration: none;
        color: #007bff;
        transform: translateY(-2px);
    }
`

const ProfileStyled = styled.div`
    display: flex;
    height: 36px;
    width: 36px;
    background-color: #6c757d;
    border-radius: 50%;
		cursor: pointer;

    img {
        border-radius: 50%;
    }
`;
const ProfileDropdown = styled.ul`
    display: flex;
    flex-direction: column;
    position: absolute;

    gap: 8px;
    width: auto;
    top: 80px;
    right: 10px;

    background-color: #eee;
    text-align: right;
    border-radius: 12px;
    padding: 12px;

    font-size: 0.9rem;

    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);

    .name {
        font-weight: bold;
    }
`;

const ProfileContainer = styled.div`
    padding: 0.5rem 1rem;
    color: #333;
    position: relative;
`;