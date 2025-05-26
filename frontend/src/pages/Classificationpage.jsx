import React, { useEffect, useState } from 'react';
import { useClassificationStore } from '../store/classification';
import {
    Text,
    Container,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    useDisclosure,
} from '@chakra-ui/react';

const ClassificationPage = () => {
    const { fetchClassifications, classifications, deleteClassification, updateClassification } = useClassificationStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedClassificationId, setSelectedClassificationId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        class: '',
        botanical_name: ''
    });

    useEffect(() => {
        fetchClassifications();
    }, [fetchClassifications]);

    const handleDeleteClassification = async (id) => {
        try {
            const { success, message } = await deleteClassification(id);
            if (success) {
                toast({
                    title: "Deleted",
                    description: message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                fetchClassifications();
            } else {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const openUpdateModal = (classification) => {
        setSelectedClassificationId(classification._id);
        setFormData({
            name: classification.name,
            class: classification.class,
            botanical_name: classification.botanical_name
        });
        onOpen();
    };

    const handleUpdateClassification = async () => {
        try {
            const { success, message } = await updateClassification(selectedClassificationId, formData);
            if (success) {
                toast({
                    title: "Updated",
                    description: "Classification updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                fetchClassifications();
                onClose();
            } else {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Container maxW='container.xl' py={12}>
            <TableContainer>
                <Text
                    fontSize="30"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    textAlign="center"
                >
                    Classification Page
                </Text>
                <Table variant="simple">
                    <Tbody>
                        {classifications && classifications.length > 0 ? (
                            Object.entries(
                                classifications.reduce((groups, item) => {
                                    if (!groups[item.class]) {
                                        groups[item.class] = [];
                                    }
                                    groups[item.class].push(item);
                                    return groups;
                                }, {})
                            ).map(([className, items]) => (
                                <React.Fragment key={className}>
                                    <Tr bg="gray.100">
                                        <Th >{className}</Th>
                                        <Th>Botanical Name</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                    {items.map((classification) => (
                                        <Tr key={classification._id}>
                                            <Td>{classification.name}</Td>
                                            <Td>{classification.botanical_name}</Td>
                                            <Td>
                                                <Button
                                                    colorScheme="blue"
                                                    size="sm"
                                                    mr={2}
                                                    onClick={() => openUpdateModal(classification)}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    colorScheme="red"
                                                    size="sm"
                                                    onClick={() => handleDeleteClassification(classification._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="3" textAlign="center">
                                    No Classification Data Available
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>


            </TableContainer>

            {/* Update Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Classification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            mb={4}
                        />
                        <Input
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            mb={4}
                        />
                        <Input
                            placeholder="Botanical Name"
                            name="botanical name"
                            value={formData.botanical_name}
                            onChange={handleChange}
                            mb={4}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateClassification}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default ClassificationPage;
