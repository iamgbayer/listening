import { StyleSheet } from 'react-native'
export const hairlineWidth = StyleSheet.hairlineWidth

import { Tokens } from '../Tokens'
import { dec, subtract } from 'ramda'

export const ActionSheet = {
  styles: {
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.4,
      backgroundColor: '#000'
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row'
    },
    body: {
      flex: 1,
      alignSelf: 'flex-end',
      backgroundColor: 'transparent'
    },
    messageBox: {
      height: 30,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    messageText: {
      color: 'red',
      fontSize: 12
    },
    buttonBox: {
      height: 58,
      width: subtract(Tokens.window.width, 40),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: hairlineWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Tokens.colors.primary,
      borderRadius: Tokens.border.radius.fifteen,
      marginBottom: 10
    },
    cancelButtonBox: {
      color: Tokens.colors.primary,
      height: 58,
      width: subtract(Tokens.window.width, 40),
      marginTop: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      marginBottom: 30,
      justifyContent: 'center',
      backgroundColor: Tokens.colors.quintiary,
      borderRadius: Tokens.border.radius.fifteen
    }
  }
}
