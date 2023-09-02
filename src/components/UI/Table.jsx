import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { DataTable, Text } from 'react-native-paper'

import StatusBadge from './StatusBadge'

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
        {columns.map(col => (
          <DataTable.Title key={col.label}>{col.label}</DataTable.Title>
        ))}
      </DataTable.Header>

      {rows.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map(row => (
        <DataTable.Row key={row.id} className="h-16">
          <DataTable.Cell>
            <View>
              <Text variant="button">{row.name}</Text>
              <Text variant="caption">{row.email}</Text>
            </View>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <StatusBadge status={row.status} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(rows.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${page * itemsPerPage + 1}-${page * itemsPerPage + itemsPerPage} de ${rows.length}`}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  )
}
