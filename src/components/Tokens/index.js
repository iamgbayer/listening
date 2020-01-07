import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const Tokens = {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  colors: {
    primary: '#f3f5f9',
    secondary: '#fff',
    tertiary: '#344356',
    quartiary: '#e8eef4',
    quintiary: '#ff7c83',
    sextiary: '#2e2a5d',
    support: {
      primary: '#00d9cd',
      secondary: '#5468ff',
      tertiary: '#3d56f0',
      quartiary: '#555093',
      quintiary: '#65637f',
      sextiary: '#ff6870',
      seventiary: '#aeb8ff'
    }
  },
  shadow: {
    primary: '0px 12px 19px rgba(60, 128, 209, 0.09)',
    secondary: '0px 10px 25px rgba(84, 104, 255, 0.3)',
    tertiary: '0px 10px 25px rgba(255, 84, 120, 0.29764)',
    quartiary: '0px 2px 25px rgba(0, 217, 205, 0.237462)'
  },
  border: {
    radius: {
      fiveHundred: 500,
      hundred: 100,
      fifty: 50,
      fifteen: 15,
      nine: 9,
      five: 5
    }
  },
  font: {
    weight: {
      bold: 'bold',
      medium: 'medium',
      regular: 'regular'
    },
    size: {
      thirty: 30,
      twenty: 20,
      sixteen: 16,
      fourteen: 14,
      ten: 10
    }
  }
}
