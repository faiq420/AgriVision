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
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';
import RenderHTML from 'react-native-render-html';
import axios from 'axios';

interface FilePath {
  data: string;
  uri: string;
}

const DetectDisease = () => {
  const {width} = useWindowDimensions();
  const [filePath, setFilePath] = useState<FilePath>({data: '', uri: ''});
  const [fileData, setFileData] = useState<string>('');
  const [fileUri, setFileUri] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

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
      setResponse(null)
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
      setFetching(true);
      const response = await fetch(
        'https://6e96-2400-adc1-4ac-7100-3917-b04b-e88d-fd2f.ngrok-free.app/predict',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse('Not able to detect plant. Try again.');
    } finally {
      setFetching(false);
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
          <View style={{alignItems: 'center'}}>
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
        </View>
        <ScrollView style={styles.responseContainer}>
          {fetching && (
            <Text
              style={{color: '#000', textAlign: 'center', fontStyle: 'italic'}}>
              Fetching...
            </Text>
          )}
          {response && (
            <RenderHTML
              contentWidth={width}
              source={{html: response}}
              baseStyle={{
                fontSize: 14,
                color: '#1f2937',
              }}
            />
          )}
        </ScrollView>
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
    marginTop: 5,
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
  responseContainer: {
    width: '100%',
    // backgroundColor: '#fff',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // shadowOffset: {width: 0, height: 5},
    maxHeight: vh(30),
    marginVertical: 20,
    padding: 20,
  },
});

export default DetectDisease;
