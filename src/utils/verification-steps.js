import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

export const steps = [
  {
    label: 'Dirección',
    Icon: props => <MaterialCommunityIcons name="map-marker-outline" size={25} {...props} />,
  },
  {
    label: 'Ocupación',
    Icon: props => <MaterialCommunityIcons name="briefcase-outline" size={25} {...props} />,
  },
  {
    label: 'Documento',
    Icon: props => <FontAwesome name="id-card-o" size={19} {...props} />,
  },
]
