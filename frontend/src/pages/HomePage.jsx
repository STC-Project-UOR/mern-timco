import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTimberStore } from "../store/timber";
import TimberCard from "../components/TimberCard";

const HomePage = () => {
	const { fetchTimbers, timbers } = useTimberStore();

	useEffect(() => {
		fetchTimbers();
	}, [fetchTimbers]);
	console.log("timbers", timbers);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Timber
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{timbers.map((timber) => (
						<TimberCard key={timber._id} timber={timber} />
					))}
				</SimpleGrid>

				{timbers.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No timber found 😢{" "}
						<Link to={"/add"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Add a timber
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;