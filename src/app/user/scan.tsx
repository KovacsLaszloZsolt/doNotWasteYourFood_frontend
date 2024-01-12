import * as ImagePicker from 'expo-image-picker';
import React, { ReactElement, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Scan = (): ReactElement => {
  const [recognizedText, setRecognizedText] = useState('');

  const selectImage = async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={selectImage}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      {recognizedText ? <Text>{recognizedText}</Text> : null}
    </View>
  );
};

export default Scan;
