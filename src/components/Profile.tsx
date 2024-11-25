import { useAuth } from '@/lib/AuthContext.tsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import defaultProfile from '../assets/default_profile.svg';
import LogoutModal from '@/components/login/LogoutModal.tsx';

export default function Profile() {
	const { user, email, displayName, photoURL } = useAuth();
	const [ dropdownView, setDropdownView ] = useState(false);
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	
	
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.profile-drop, .profile-container')) {
				setDropdownView(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	
	// 프로필 클릭 시 드롭다운 박스
	const ProfileDetail = () => {
		return (
			<>
				<li className="name">{ displayName }</li>
				<li>{ email }</li>
				<li>
					<LogoutStyles onClick={ () => setIsModalOpen(true) }>
						로그아웃
					</LogoutStyles>
				</li>
			</>
		
		);
	};
	
	return (
		<ProfileContainer className="profile-container">
			
			<ProfileStyled onClick={ () => setDropdownView(!dropdownView) }>
				{ user ?
					(<img src={ photoURL || '' } alt="" />)
					:
					(<img src={ defaultProfile } alt="" />)
				}
			</ProfileStyled>
			{ user && dropdownView &&
				(
					<ProfileDropdown className="profile-drop">
						<ProfileDetail />
					</ProfileDropdown>
				)
			}
			<LogoutModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		
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
    position: relative;
`;