import React, { Component } from 'react';
import {
  Text, Image, Linking,
  View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase'
import openMap from 'react-native-open-maps'

import { chooseRestaurant } from '../actions'

class ItemList extends Component {
  state = {}

  onPressLikeButton = () => {
    const restaurant = this.props.restaurant
    if (this.props.restaurant.isLike === true) {
      restaurant.like = restaurant.like - 1
      restaurant.isLike = false
    } else {
      restaurant.like = restaurant.like + 1
      restaurant.isLike = true
    }

    firebase.database().ref(`restaurants/${this.props.restaurant.id}`)
      .set(restaurant)
  }

  openExternalMap = () => {
    openMap({
      latitude: this.props.restaurant.latitude,
      longitude: this.props.restaurant.longitude
    })
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.chooseRestaurant(this.props.restaurant)}>
        <Image
          style={{ height: 100, borderRadius: 5, margin: 3 }}
          source={{ uri: this.props.restaurant.image }} />
        <Text style={styles.likeCount}>{this.props.restaurant.like}</Text>
        <Text style={styles.name}>{this.props.restaurant.name}</Text>
        <Text
          style={styles.description}
          numberOfLines={2}
        >{this.props.restaurant.description}</Text>
        <TouchableWithoutFeedback
          onPress={this.onPressLikeButton}>
          <View
            style={styles.button}>
            <Image
              style={{ height: 20, width: 20 }}
              source={this.props.restaurant.isLike === true
                ? require('../../img/ic_like.png')
                : require('../../img/ic_dont_like.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={{ flexDirection: 'row', margin: 10 }}
          onPress={this.openExternalMap}>
          <Image
            style={{ height: 20, width: 20, marginEnd: 5 }}
            source={{ uri: 'data:image/png;base64,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' }} />
          <Text>Direction</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 5
  },
  name: {
    margin: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    color: 'gray',
    marginHorizontal: 10,
    fontSize: 12
  },
  button: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    position: 'absolute',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: 80,
    left: 100,
    shadowOffset: { width: 3, height: 3, },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5
  },
  likeCount: {
    backgroundColor: 'white',
    position: 'absolute',
    padding: 5,
    margin: 3
  }
})

export default connect(null, { chooseRestaurant })(ItemList);