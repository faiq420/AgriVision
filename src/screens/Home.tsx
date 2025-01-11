import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';
import GlobalFont from 'react-native-global-font';
import Icon from 'react-native-vector-icons/FontAwesome';
const Home = () => {
  useEffect(() => {
    GlobalFont.applyGlobal('Poppins');
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.introDiv}>
        <Image
          source={require('../assets/Plant_App_Icon.png')}
          style={styles.introImage}
        />
        <Text style={styles.introText}>Welcome to AgriVision!</Text>
      </View>
      {/* Features */}
      <View style={{marginTop: 40}}>
        <Text style={styles.heading}>Features</Text>
        <View style={styles.grid}>
          <View style={styles.tile}>
            <Icon name="viadeo" size={30} color="#14532d" />
            <Text style={{fontSize: 14, ...styles.textColor}}>
              Easy Detection
            </Text>
          </View>
          <View style={styles.tile}>
            <Icon name="pagelines" size={30} color="#14532d" />
            <Text style={{fontSize: 14, ...styles.textColor}}>
              Cause & Solution
            </Text>
          </View>
          <View style={styles.tile}>
            <Icon name="leaf" size={30} color="#14532d" />
            <Text style={{fontSize: 14, ...styles.textColor}}>
              Large Plant Support
            </Text>
          </View>
        </View>
      </View>
      {/* Services */}
      <View style={{marginTop: 40}}>
        <Text style={styles.heading}>Services</Text>
        <View style={styles.serviceCard}>
          <Image
            source={require('../assets/fruitsandvegies.jpg')}
            style={styles.image}
          />
          <Text style={{...styles.serviceHeading, ...styles.headingColor}}>
            Fruits & Veggies Identification
          </Text>
          <Text style={styles.serviceDescription}>
            The advanced vegetation identification system uses machine learning
            to accurately identify fruits and vegetables in real time. This
            feature aids farmers, researchers, and gardening enthusiasts in
            recognizing plants on-site to make informed decisions about crops
            and produce.
          </Text>
        </View>
        <View style={styles.serviceCard}>
          <Image
            source={require('../assets/PestedLeave.jpg')}
            style={styles.image}
          />
          <Text style={{...styles.serviceHeading, ...styles.headingColor}}>
          Disease Detection
          </Text>
          <Text style={styles.serviceDescription}>
            Our disease detection app analyzes plant leaf images to identify
            potential illnesses and assess damage, enabling users to take prompt
            action and prevent crop loss, without relying on indiscriminate
            pesticide use.
          </Text>
        </View>
      </View>
      {/* Vision */}
      <View style={{marginTop: 40}}>
        <Text style={styles.heading}>Vision</Text>
        <View style={styles.visionContainer}>
          <Image
            source={require('../assets/action.jpg')}
            style={styles.visionImage}
          />
          <Text style={styles.visionDescription}>
            Food security is important for billions of people. To keep crops
            healthy, we need to manage plant health well. Spotting plant
            diseases quickly can help reduce damage and increase how much we
            grow. We've made new ways to find these diseases that can boost crop
            yields and cut down on harmful pesticides.{'\n\n'}
            While improving crop varieties is key, we also need to focus on
            disease detection. Old methods, like farmers checking plants by
            hand, can take a lot of time and money. Our app solves this problem.
            It automatically finds diseases on fruits, vegetables, and plant
            leaves. This offers a faster and easier way than traditional
            methods.
          </Text>
          <Text style={styles.visionDescription}></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fffefc',
    height: vh(70),
    color: '#1f2937',
    fontFamily: 'Raleway',
    fontWeight: 600,
  },
  textColor: {
    color: '#1f2937',
  },
  headingColor: {
    color: '#14532d',
  },
  introDiv: {
    borderRadius: 40,
    backgroundColor: '#14532d',
    padding: 16,
    alignItems: 'center',
  },
  introImage: {
    height: vh(33),
    width: vh(33),
    marginTop: 10,
  },
  introText: {
    color: '#fff',
    fontSize: 22,
  },
  introSubText: {
    color: '#fff',
    fontSize: 12,
  },
  heading: {
    fontSize: 28,
    color: '#14532d',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  featureDiv: {
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#1f2937',
    borderWidth: 1,
    padding: 16,
  },
  boxShadowLg: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  tile: {
    width: '48%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
    fontSize: 12,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  serviceCard: {
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 5},
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  serviceHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
  },
  visionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  visionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  visionDescription: {
    fontSize: 16,
    color: '#555',
  },
});

export default Home;
