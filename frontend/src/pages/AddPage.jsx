import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useTimberStore } from "../store/timber";

const AddPage = () => {
	const [newTimber, setNewTimber] = useState({
		id: "",
		height: "",
		diameter: "",
		volume: "",
		in_date: "",
		in_location: "",
		store_location: "",
		name: "",
		class: "",
		note: "",
	});
	const toast = useToast();

	const { createTimber } = useTimberStore();

	const handleAddTimber = async () => {
		const { success, message } = await createTimber(newTimber);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewTimber({
			id: "",
			height: "",
			diameter: "",
			volume: "",
			in_date: "",
			in_location: "",
			store_location: "",
			name: "",
			class: "",
			note: ""
		});
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Add New Timber
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Timber ID'
							name='id'
							value={newTimber.id}
							onChange={(e) => setNewTimber({ ...newTimber, id: e.target.value })}
						/>
						<Input
							placeholder='Class'
							name='class'
							value={newTimber.class}
							onChange={(e) => setNewTimber({ ...newTimber, class: e.target.value })}
						/>
						<Input
							placeholder='Name'
							name='name'
							value={newTimber.name}
							onChange={(e) => setNewTimber({ ...newTimber, name: e.target.value })}
						/>
						<Input
							placeholder='Height (h) in meters'
							name='height'
							value={newTimber.height}
							onChange={(e) => setNewTimber({ ...newTimber, height: e.target.value })}
						/>
						<Input
							placeholder='Diameter (DBH) in meters'
							name='diameter'
							value={newTimber.diameter}
							onChange={(e) => setNewTimber({ ...newTimber, diameter: e.target.value })}
						/>

						<Input
							placeholder='Volume(in cubic meters)'
							name='volume'
							value={newTimber.volume}
							onChange={(e) => setNewTimber({ ...newTimber, volume: e.target.value })}
						/>
						<Input
							placeholder='Received Date'
							name='received date'
							value={newTimber.in_date}
							onChange={(e) => setNewTimber({ ...newTimber, in_date: e.target.value })}
						/>
						<Input
							placeholder='Received Location'
							name='received location'
							value={newTimber.in_location}
							onChange={(e) => setNewTimber({ ...newTimber, in_location: e.target.value })}
						/>
						<Input
							placeholder='Store Location'
							name='location'
							value={newTimber.store_location}
							onChange={(e) => setNewTimber({ ...newTimber, store_location: e.target.value })}
						/>
						<Input
							placeholder='Additional Note'
							name='note'
							value={newTimber.note}
							onChange={(e) => setNewTimber({ ...newTimber, note: e.target.value })}
						/>


						<Button colorScheme='blue' onClick={handleAddTimber} w='full'>
							Add Timber
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default AddPage;