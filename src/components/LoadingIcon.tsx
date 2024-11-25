import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from "@/components/Container.tsx";

export default function CircularIndeterminate() {
	return (
		<Container>
			<Box sx={{
				height: "200px",
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				
			}}>
				<CircularProgress/>
			</Box>
		</Container>
	);
}