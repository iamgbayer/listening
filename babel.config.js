module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './src/components',
          screens: './src/screens',
          config: './src/config',
          helpers: './src/helpers',
          navigations: './src/navigations'
        }
      }
    ]
  ]
}
