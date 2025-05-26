import React, { useEffect, useState } from 'react';
import {
    Input,
    Button,
    Container,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
    Spinner,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useTimberStore } from '../store/timber';

const ActionPage = () => {
    const { id } = useParams(); // get timber ID from URL
    const { timbers, fetchTimbers } = useTimberStore();
    const [timber, setTimber] = useState(null);
    const [transferData, setTransferData] = useState([]);
    const [transferForm, setTransferForm] = useState({
        date: '',
        location: '',
        lorryNumber: '',
        permitNumber: '',
        driverName: ''
    });

    const handleTransferChange = (e) => {
        const { name, value } = e.target;
        setTransferForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddTransfer = () => {
        if (!transferForm.date || !transferForm.location) return; // basic validation
        setTransferData((prev) => [...prev, transferForm]);
        setTransferForm({
            date: '',
            location: '',
            lorryNumber: '',
            permitNumber: '',
            driverName: ''
        });
    };

    useEffect(() => {
        fetchTimbers(); // ensure store is loaded
    }, [fetchTimbers]);

    useEffect(() => {
        if (timbers && id) {
            const found = timbers.find((t) => t._id === id);
            setTimber(found);
        }
    }, [timbers, id]);

    return (
        <Container maxW="container.xl" py={12}>
            <Tabs variant="enclosed" colorScheme="blue" defaultIndex={0}>
                <TabList>
                    <Tab>Sawn Timber</Tab>
                    <Tab>Transfer</Tab>
                    <Tab>Log Sell</Tab>
                    <Tab>Details</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box p={4} borderWidth="1px" borderRadius="lg">
                            <strong>Sawn Timber</strong> content goes here.
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        <Box p={4} borderWidth="1px" borderRadius="lg">
                            {timber ? (
                                <Box mt={4}>
                                    <Text><strong>Received Date:</strong> {timber.in_date}</Text>
                                    <Text><strong>Received Location:</strong> {timber.in_location}</Text>
                                    <Text><strong>Store Location:</strong> {timber.store_location}</Text>
                                </Box>
                            ) : (
                                <Spinner mt={4} />
                            )}

                            <Box mt={6}>
                                <Text fontWeight="bold" mb={2}>Transfer History:</Text>
                                {transferData.length === 0 ? (
                                    <Text>No transfer data added yet.</Text>
                                ) : (
                                    <Table variant="simple" size="sm" mt={2}>
                                        <Thead>
                                            <Tr>
                                                <Th>Date</Th>
                                                <Th>Location</Th>
                                                <Th>Lorry Number</Th>
                                                <Th>Permit Number</Th>
                                                <Th>Driver Name</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {transferData.map((item, index) => (
                                                <Tr key={index}>
                                                    <Td>{item.date}</Td>
                                                    <Td>{item.location}</Td>
                                                    <Td>{item.lorryNumber}</Td>
                                                    <Td>{item.permitNumber}</Td>
                                                    <Td>{item.driverName}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                )}
                            </Box>

                            <Box mt={6}>
                                <Text fontWeight="bold" mb={2}>Transfer Timber</Text>
                                <Input
                                    placeholder="Transfer Date"
                                    type="date"
                                    name="date"
                                    value={transferForm.date}
                                    onChange={handleTransferChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder="Transfer Location"
                                    name="location"
                                    value={transferForm.location}
                                    onChange={handleTransferChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder="Lorry Number"
                                    name="lorryNumber"
                                    value={transferForm.lorryNumber}
                                    onChange={handleTransferChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder="Permit Number"
                                    name="permitNumber"
                                    value={transferForm.permitNumber}
                                    onChange={handleTransferChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder="Driver Name"
                                    name="driverName"
                                    value={transferForm.driverName}
                                    onChange={handleTransferChange}
                                    mb={3}
                                />
                                <Button onClick={handleAddTransfer} colorScheme="blue">
                                    Add Transfer
                                </Button>
                            </Box>
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        <Box p={4} borderWidth="1px" borderRadius="lg">
                            <strong>Log Sell</strong> content goes here.
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        <Box p={4} borderWidth="1px" borderRadius="lg">
                            <strong>Details</strong>
                            {timber ? (
                                <Box mt={4}>
                                    <Text><strong>ID:</strong> {timber.id}</Text>
                                    <Text><strong>Name:</strong> {timber.name}</Text>
                                    <Text><strong>Class:</strong> {timber.class}</Text>
                                    <Text><strong>Height:</strong> {timber.height}</Text>
                                    <Text><strong>Diameter:</strong> {timber.diameter}</Text>
                                    <Text><strong>Volume:</strong> {timber.volume}</Text>
                                    <Text><strong>Note:</strong> {timber.note}</Text>
                                </Box>
                            ) : (
                                <Spinner mt={4} />
                            )}
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default ActionPage;
