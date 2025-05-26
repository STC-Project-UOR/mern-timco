import React, { useEffect, useState } from 'react';
import { useTimberStore } from '../store/timber';
import { Link } from "react-router-dom";
import {
    Container,
    Table,
    Thead,
    Tbody,
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
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react';

const StorePage = () => {
    const { fetchTimbers, timbers, deleteTimber, updateTimber } = useTimberStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTimberId, setSelectedTimberId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        height: '',
        diameter: '',
        volume: '',
        in_date: '',
        in_location: '',
        store_location: '',
        name: '',
        class: '',
        note: ''
    });

    useEffect(() => {
        fetchTimbers();
    }, [fetchTimbers]);

    const handleDeleteTimber = async (id) => {
        try {
            const { success, message } = await deleteTimber(id);
            if (success) {
                toast({
                    title: "Deleted",
                    description: message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                fetchTimbers();
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

    const openUpdateModal = (timber) => {
        setSelectedTimberId(timber._id);
        setFormData({
            id: timber.id,
            height: timber.height,
            diameter: timber.diameter,
            volume: timber.volume,
            in_date: timber.in_date,
            in_location: timber.in_location,
            store_location: timber.store_location,
            name: timber.name,
            class: timber.class,
            note: timber.note
        });
        onOpen();
    };

    const handleUpdateTimber = async () => {
        try {
            const { success, message } = await updateTimber(selectedTimberId, formData);
            if (success) {
                toast({
                    title: "Updated",
                    description: "Timber updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                fetchTimbers();
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
            <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 30]}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>List of Timbers</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Height</Th>
                            <Th>Diameter</Th>
                            <Th>Volume</Th>
                            <Th>Received Date</Th>
                            <Th>Received Location</Th>
                            <Th>Stored</Th>
                            <Th>Note</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {timbers && timbers.length > 0 ? (
                            timbers.map((timber) => (
                                <Tr key={timber._id}>
                                    <Td>{timber.id}</Td>
                                    <Td>{timber.height}</Td>
                                    <Td>{timber.diameter}</Td>
                                    <Td>{timber.volume}</Td>
                                    <Td>{timber.in_date}</Td>
                                    <Td>{timber.in_location}</Td>
                                    <Td>{timber.store_location}</Td>
                                    <Td>{timber.note}</Td>
                                    <Td>
                                        <Link to={`/action/${timber._id}`}>
                                            <Button
                                                colorScheme="blue"
                                                size="sm"
                                                mr={2}
                                            >
                                                Action
                                            </Button>
                                        </Link>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="3" textAlign="center">
                                    No Timber Data Available
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
                    <ModalHeader>Update Timber</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            mb={4}
                        />
                        <Input
                            placeholder="Class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateTimber}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default StorePage;
