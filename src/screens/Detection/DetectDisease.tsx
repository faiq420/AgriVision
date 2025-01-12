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
// Interface for the state
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

  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      const source = {uri: asset.uri};
      setFilePath({data: asset.base64 || '', uri: asset.uri || ''});
      setFileData(asset.base64 || '');
      setFileName(asset.fileName || '');
      setFileUri(asset.uri || '');

      // Extract file details
      const fileUri = asset.uri || '';
      const fileName = asset.fileName || 'image.jpg';
      const fileType = asset.type || 'image/jpeg';

      // Prepare the FormData object
      getBase64FromUri(fileUri)
        .then(base64String => {
          const file = base64ToFile(base64String, fileName);

          // Prepare the FormData object and send it
          const formData = new FormData();
          formData.append('file', file);

          const url = 'https://your-endpoint-url.com/upload';
          fetch(url, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(result => {
              console.log('Response:', result);
              // setResponse(result)
            })
            .catch(error => console.error('Error uploading file:', error));
        })
        .catch(error => {
          console.error('Error converting URI to base64:', error);
        });
    }
  };

  const base64ToFile = (base64String: string, fileName: string): File => {
    // Extract the base64 string, excluding the prefix (data:image/png;base64,)
    const byteString = atob(base64String.split(',')[1]);

    // Derive MIME type from the base64 string
    const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];

    // Convert base64 string into a binary array using Uint8Array
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Populate the Uint8Array with byte values
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create a Blob from the binary array (this is more efficient than manually using Uint8Array)
    const blob = new Blob([uint8Array], {type: mimeType});

    // Create and return a new File object from the Blob
    return new File([blob], fileName, {type: mimeType});
  };

  const getBase64FromUri = (uri: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      fetch(uri)
        .then(response => response.blob())
        .then(blob => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob); // This will return base64 string
        })
        .catch(reject);
    });
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
        </View>
        <ScrollView
          style={{
            maxHeight: vh(40),
            marginTop: 20,
            padding: 8,
          }}>
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
  //   scrollView: {
  //     backgroundColor: Colors.lighter,
  //   },
  body: {
    borderColor: 'black',
    borderWidth: 1,
    height: vh(100),
    backgroundColor: '#fffefc',
    // height: Dimensions.get('screen').height - 20,
    // width: Dimensions.get('screen').width,
  },
  ImageSections: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'blue',
    // height: vh(30),
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
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
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

export default DetectDisease;
