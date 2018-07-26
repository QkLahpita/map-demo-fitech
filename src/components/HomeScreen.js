import React, { Component } from 'react';
import {
  Text, Dimensions, Platform, FlatList,
  View, StyleSheet, Image
} from 'react-native';
import { connect } from 'react-redux';

import firebase from 'react-native-firebase'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ItemList from './ItemList';
import { chooseRestaurant } from '../actions'

const mapGrayStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

class HomeScreen extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    firebase.database().ref('restaurants/').on('value', res => {
      this.setState({ data: res._value })
      this.props.chooseRestaurant(res._value[0])
    })
  }

  renderItem = ({ item }) => <ItemList restaurant={item} />

  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 20 : 0 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.decorationView}>
            <Text style={styles.locationText}>Our location</Text>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={mapGrayStyle}
          >
            {this.props.currentRestaurant != null &&
              <Marker
                coordinate={{
                  latitude: this.props.currentRestaurant.latitude,
                  longitude: this.props.currentRestaurant.longitude
                }}>
                <View style={{ alignItems: 'center' }}>
                  <Image style={{ width: 40, height: 40 }}
                    source={require('../../img/ic_location.png')} />
                  <Text style={{ fontWeight: 'bold', paddingTop: 5 }}>{this.props.currentRestaurant.name}</Text>
                </View>
              </Marker>
            }
          </MapView>
        </View>
        <FlatList
          style={styles.list}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          data={this.state.data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  decorationView: {
    backgroundColor: '#fdd430',
    height: 120
  },
  locationText: {
    position: 'absolute',
    left: 20,
    top: 15,
    fontSize: 24,
    color: 'black'
  },
  list: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 75 : 55
  }
})

const mapStateToProps = ({ currentRestaurant }) => ({ currentRestaurant })

export default connect(mapStateToProps, { chooseRestaurant })(HomeScreen);