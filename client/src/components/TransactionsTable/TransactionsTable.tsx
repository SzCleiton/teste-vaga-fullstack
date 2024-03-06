import {
	Box,
	Button,
	Table,
	TableCaption,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { Transaction } from "../../interfaces";
import { usePagination, useTransactions } from "../../store";

export function TransactionTable() {
	const { transactions, setTransactions } = useTransactions();
	const { page, setPage, hasNextPage, setHasNextPage } = usePagination();

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const fetchData = async (pageNumber: any) => {
		const response = await fetch(`http://localhost:8080/data/${pageNumber}`, {
			method: "GET",
		});
		const responseBody = await response.json();
		setTransactions(responseBody.transactions);
		setHasNextPage(responseBody.hasNextPage);
	};

	const handlePageChange = async (newPage: number) => {
		setPage(newPage);
		await fetchData(newPage);
	};

	const handleColor = (transaction: Transaction) => {
		if (transaction.isDocumentValid) return "green";
		return transaction.isPaymentOk === false ? "red" : "#000";
	};

	return (
		<Box overflowX="auto">
			<Table variant="simple">
				<TableCaption>Lista de Transações</TableCaption>
				<Thead>
					<Tr>
						{Object.keys(transactions[0]).map((header) => (
							<Th key={header}>{header}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{transactions.map((transaction) => (
						<Tr key={transaction._id?.toString()}>
							{Object.values(transaction).map((value, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<Td key={index} style={{ color: handleColor(transaction) }}>
									{value instanceof Date ? value.toDateString() : String(value)}
								</Td>
							))}
						</Tr>
					))}
				</Tbody>
			</Table>

			<Box mt={4} display="flex" justifyContent="space-between">
				<Button
					onClick={() => handlePageChange(Math.max(page - 1, 1))}
					isDisabled={page === 1}
				>
					Página Anterior
				</Button>
				<Text>Página {page}</Text>
				<Button
					onClick={() => handlePageChange(page + 1)}
					isDisabled={!hasNextPage}
				>
					Próxima Página
				</Button>
			</Box>
		</Box>
	);
}
