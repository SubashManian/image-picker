/** @format */

import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class App extends React.Component {
  state = {
    imagesource: null,
  };

  constructor(props) {
    super(props);
    this.photobutton = this.photobutton.bind(this);
  }

  photobutton() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) 
        console.log('User cancelled photo picker');

      if (response.error)
        console.log('ImagePicker Error: ', response.error);

      if (response.customButton)
        console.log('User tapped custom button: ', response.customButton);

      else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={[ styles.imageview, styles.imageContainer, { marginBottom: 20 }, ]}>

          {this.state.imagesource === null ? 
          (<Image style={styles.imageview} source={require('./assets/user-image.png')}/>) : 
          ( <Image style={styles.imageview} source={this.state.imagesource} /> ) }

        </View>

        <TouchableOpacity onPress={this.photobutton.bind(this)}>
          <Text>Select a Photo</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageview: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
