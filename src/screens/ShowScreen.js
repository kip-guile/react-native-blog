import React, { useContext } from 'react'
import { Context } from '../context/BlogContext'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam('id')
  const { state } = useContext(Context)
  const blogPost = state.find((blogPost) => blogPost.id === id)
  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  )
}

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', { id: navigation.getParam('id') })
        }
      >
        <EvilIcons
          style={{ color: 'red', marginRight: 10 }}
          size={30}
          name='pencil'
        />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
})

export default ShowScreen
