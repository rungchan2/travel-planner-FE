import styled from 'styled-components';
import { useEffect, useState } from 'react';


interface Slide {
	id: number;
	imageUrl: string;
}

interface ImgAutoSlideProps {
	slides: Slide[];
}

const ImgAutoSlide: React.FC<ImgAutoSlideProps> = ({ slides }) => {
	
	const [ currentImg, setCurrentImg ] = useState(0);
	const length = slides.length;
	
	const nextSlide = () => {
		setCurrentImg(currentImg === length - 1 ? 0 : currentImg + 1);
	};
	
	// const prevSlide = () => {
	// 	setCurrentImg(currentImg === 0 ? length - 1 : currentImg - 1);
	// };
	
	useEffect(() => {
		slides.forEach(slide => {
			const img = new Image();
			img.src = slide.imageUrl;
		});
	}, [ slides ]);
	
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 8000);
		
		return () => clearInterval(interval); //
	}, [ currentImg, length ]);
	
	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}
	
	return (
		<ImgAutoSlideStyled>
			<div className="dim"></div>
			
			<div className="slides">
					{ slides.map((slide, i) => (
						<div
							className={ i === currentImg ? 'slide active' : 'slide' }
							key={ slide.id }
						>
							<img src={ slide.imageUrl } alt={ `Slide ${ i + 1 }` } className="image" />
						</div>
					)) }
				</div>
		</ImgAutoSlideStyled>
	);
};

const ImgAutoSlideStyled = styled.div`
    position: relative;
    width: 100%;
    margin: auto;
    overflow: hidden;

    .dim {
        position: absolute;
		    height: 100%;
		    width: 100%;
		    border-radius: 18px;
		    left: 50%;
		    top: 50%;
		    transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.3);
		    z-index: 99;
    }

    .slides {
        position: relative;
        width: 100%;
        height: 100%;

    }

    .slide {
        opacity: 0;
        transition: opacity 1s ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

    }

    .slide.active {
        opacity: 1;
        position: relative;

    }

    .image {
        width: 100%;
        height: auto;
        display: block;
    }

`;

export default ImgAutoSlide;