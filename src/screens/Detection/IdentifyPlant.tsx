import React, {useState, Fragment} from 'react';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import template from '../../assets/templateImage.png';
import bin from '../../assets/delete-file.png';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {vh, vw} from 'react-native-css-vh-vw';
import axios from 'axios';

interface FilePath {
  data: string;
  uri: string;
}

const IdentifyPlant = () => {
  const [filePath, setFilePath] = useState<FilePath>({data: '', uri: ''});
  const [fileData, setFileData] = useState<string>('');
  const [fileUri, setFileUri] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const handleImagePickerResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      const fileUri = asset.uri || '';
      const fileName = asset.fileName || 'image.jpg';
      const fileType = asset.type || 'image/jpeg';
      const base64Data = asset.base64 || '';

      setFilePath({data: base64Data, uri: fileUri});
      setFileData(base64Data);
      setFileName(fileName);
      setFileUri(fileUri);

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });

      sendToApi(formData);
    }
  };

  const sendToApi = async (formData: FormData) => {
    try {
      const response = await fetch(
        'https://87a8-2400-adc1-4ac-7100-4101-81a-a40d-573c.ngrok-free.app/predict',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const result = await response.json();
      setResponse(result.prediction);
    } catch (error) {
      console.log(error);
      setResponse('Not able to detect plant. Try again.');
    }
  };

  const chooseImage = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: true,
      saveToPhotos: true,
    };

    launchImageLibrary(options, handleImagePickerResponse);
  };

  const launchCameraHandler = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: true,
      saveToPhotos: true,
    };

    launchCamera(options, handleImagePickerResponse);
  };

  const renderFileData = () => {
    if (fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + fileData}}
          style={styles.images}
        />
      );
    } else {
      return <Image source={template} style={styles.images} />;
    }
  };

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return <Image source={template} style={styles.images} />;
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.ImageSections}>
          <View>
            <View>{renderFileData()}</View>
            <Text style={{color: '#1f2937'}}>{fileName}</Text>
          </View>
          {fileUri && (
            <View
              style={{
                alignItems: 'flex-end',
                width: '90%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setFilePath({data: '', uri: ''});
                  setFileData('');
                  setFileName('');
                  setFileUri('');
                  setResponse(null);
                }}>
                <Image source={bin} style={styles.bin} />
              </TouchableOpacity>
            </View>
          )}

          <ScrollView style={{height: vh(20), marginTop: 20}}>
            {response && (
              <Text style={{color: '#1f2937'}}>Detected Plant: {response}</Text>
            )}
          </ScrollView>
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              paddingBottom: 10,
              color: '#1f2937',
            }}>
            Pick Image from Camera/Gallery
          </Text>
          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={launchCameraHandler}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    borderColor: 'black',
    borderWidth: 1,
    height: vh(100),
    backgroundColor: '#fffefc',
  },
  ImageSections: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  bin: {
    height: 25,
    width: 25,
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    marginTop: 50,
    marginBottom: 10,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
  },
  btnSection: {
    width: 180,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default IdentifyPlant;
