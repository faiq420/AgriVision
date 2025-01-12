module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // You can skip iOS platform if you're working on Android only
      },
    },
  },
  assets: [
    './src/assets/fonts/',
    './node_modules/react-native-vector-icons/Fonts',
  ],
};
