import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useClassificationStore } from "../store/classification";

const CreatePage = () => {
    const [newClassification, setNewClassification] = useState({
        name: "",
        class: "",
        botanical_name: "",
    });
    const toast = useToast();

    const { createClassification } = useClassificationStore();

    const handleAddClassification = async () => {
        const { success, message } = await createClassification(newClassification);
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
        setNewClassification({
            name: "",
            class: "",
            botanical_name: ""
        });
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Classification
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Class'
                            name='class'
                            value={newClassification.class}
                            onChange={(e) => setNewClassification({ ...newClassification, class: e.target.value })}
                        />
                        <Input
                            placeholder='Name'
                            name='name'
                            value={newClassification.name}
                            onChange={(e) => setNewClassification({ ...newClassification, name: e.target.value })}
                        />
                        <Input
                            placeholder='Botanical Name'
                            name='botanical name'
                            value={newClassification.botanical_name}
                            onChange={(e) => setNewClassification({ ...newClassification, botanical_name: e.target.value })}
                        />


                        <Button colorScheme='blue' onClick={handleAddClassification} w='full'>
                            Create Classification
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};
export default CreatePage;