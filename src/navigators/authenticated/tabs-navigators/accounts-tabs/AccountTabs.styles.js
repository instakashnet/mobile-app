import { colors } from '@/theme/colors'

export const tabsStyles = {
  tabBarStyle: {
    backgroundColor: 'transparent',
    marginTop: 22,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarItemStyle: {
    width: 150,
    paddingVertical: 16,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.gray100,
  },
  tabBarIndicatorStyle: {
    height: '100%',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 150,
    borderWidth: 1,
    backgroundColor: colors.primary500,
    zIndex: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: 'green',
  },
  tabBarInactiveTintColor: colors.gray500,
  tabBarActiveTintColor: colors.white100,
  tabBarGap: 6,
}
