import {
	Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack, Select as ChakraSelect
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useTimberStore } from "../store/timber";
import Select from "react-select";


const AddPage = () => {
	const [newTimber, setNewTimber] = useState({
		id: "", height: "", diameter: "", volume: "", in_date: "",
		in_location: "", store_location: "", name: "", class: "", note: "",
	});
	const [classifications, setClassifications] = useState([]);
	const toast = useToast();
	const { createTimber } = useTimberStore();

	useEffect(() => {
		const fetchClassifications = async () => {
			try {
				const res = await fetch("/app/classifications");
				const result = await res.json();
				if (result.success) {
					setClassifications(result.data);
				} else {
					toast({
						title: "Failed to load classifications",
						status: "error",
						isClosable: true,
					});
				}
			} catch (err) {
				toast({
					title: "Error loading classifications",
					status: "error",
					isClosable: true,
				});
			}
		};
		fetchClassifications();
	}, []);

	const handleAddTimber = async () => {
		const { success, message } = await createTimber(newTimber);
		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			isClosable: true,
		});
		if (success) {
			setNewTimber({ id: "", height: "", diameter: "", volume: "", in_date: "", in_location: "", store_location: "", name: "", class: "", note: "" });
		}
	};

	// Convert classifications to dropdown options
	const nameOptions = classifications.map(c => ({
		label: c.name,
		value: c.name,
		classification: c.class, // custom data to auto-fill class
	}));

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Add New Timber
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>

						{/* Searchable Name Dropdown */}
						<Select
							placeholder="Select Name"
							options={nameOptions}
							value={nameOptions.find(opt => opt.value === newTimber.name) || null}
							onChange={(selectedOption) => {
								if (selectedOption) {
									setNewTimber({
										...newTimber,
										name: selectedOption.value,
										class: selectedOption.classification, // auto-fill class
									});
								}
							}}
							isClearable
							isSearchable
							styles={{
								control: (base) => ({
									...base,
									background: "#fff",
									borderColor: "#E2E8F0", // Chakra gray.200
									boxShadow: "none",
									":hover": { borderColor: "#3182ce" }, // Chakra blue.500
								}),
							}}
						/>


						{/* Auto-filled Class Display */}
						<Input
							placeholder="Timber Class"
							value={newTimber.class}
							isReadOnly
							bg="gray.100"
						/>

						{/* Other fields */}
						<Input placeholder='Timber ID' value={newTimber.id} onChange={(e) => setNewTimber({ ...newTimber, id: e.target.value })} />
						<Input placeholder='Height (h) in meters' value={newTimber.height} onChange={(e) => setNewTimber({ ...newTimber, height: e.target.value })} />
						<Input placeholder='Diameter (DBH) in meters' value={newTimber.diameter} onChange={(e) => setNewTimber({ ...newTimber, diameter: e.target.value })} />
						<Input placeholder='Volume' value={newTimber.volume} onChange={(e) => setNewTimber({ ...newTimber, volume: e.target.value })} />
						<Input placeholder='Received Date' value={newTimber.in_date} onChange={(e) => setNewTimber({ ...newTimber, in_date: e.target.value })} />
						<Input placeholder='Received Location' value={newTimber.in_location} onChange={(e) => setNewTimber({ ...newTimber, in_location: e.target.value })} />
						<Input placeholder='Store Location' value={newTimber.store_location} onChange={(e) => setNewTimber({ ...newTimber, store_location: e.target.value })} />
						<Input placeholder='Additional Note' value={newTimber.note} onChange={(e) => setNewTimber({ ...newTimber, note: e.target.value })} />

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
