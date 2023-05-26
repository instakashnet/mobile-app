import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

export const steps = [
  {
    label: 'Dirección',
    Icon: ({ active }) => <MaterialCommunityIcons name='map-marker-outline' size={25} color={active ? '#0a686a' : '#b0b0b0'} />
  },
  {
    label: 'Ocupación',
    Icon: ({ active }) => <MaterialCommunityIcons name='briefcase-outline' size={25} color={active ? '#0a686a' : '#b0b0b0'} />
  },
  {
    label: 'Documento',
    Icon: ({ active }) => <FontAwesome name='id-card-o' size={19} color={active ? '#0a686a' : '#b0b0b0'} />
  }
]
