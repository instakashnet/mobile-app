import { useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper'

const optionsPerPage = [3, 5]

export default function Table({ columns = [], rows = [] }) {
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0])

  useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  return (
    <DataTable>
      <DataTable.Header>
        {columns.map((col) => (
          <DataTable.Title key={col.label}>{col.label}</DataTable.Title>
        ))}
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell numeric>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        <DataTable.Cell numeric>237</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label='1-3 of 6'
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  )
}
