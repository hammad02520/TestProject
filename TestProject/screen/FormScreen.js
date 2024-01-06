import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, selectFormData } from '../redux/slice';
import formConfig from '../form-data.json';
import Toast from 'react-native-toast-message';
import CustomInput from '../component/CustomInput';
import { PRIMARY_COLOR } from '../component/constant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormComponent = () => {
    const [localFormData, setLocalFormData] = useState({});
    const dispatch = useDispatch();
    const formData = useSelector(selectFormData);
    const navigation = useNavigation()

    const handleInputChange = (fieldName, value) => {
        setLocalFormData({
            ...localFormData,
            [fieldName]: value,
        });
    };

    const handleSubmit = async () => {
        const requiredFields = formConfig.filter((field) => field.required);
        for (const field of requiredFields) {
            if (!localFormData[field.name]) {
                Toast.show({
                    type: 'error',
                    text1: 'Validation Error',
                    text2: `${field.label} is required.`,
                });

                return;
            }
        }

        try {
            await AsyncStorage.setItem('formSubmitted', 'true');
        } catch (error) {
            console.error('Error saving form submission status:', error);
        }

        dispatch(setFormData(localFormData));
        navigation.replace('HomeStack');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', fontSize: 28, fontFamily: 'MyFont' }}>Form Data</Text>
            {formConfig.map((field) => (
                <View style={{ marginVertical: 10 }} key={field.name}>
                    <CustomInput
                        containerStyle={styles.inputContainer}
                        placeholder={field.label}
                        value={localFormData[field.name] || ''}
                        onChangeText={(value) => handleInputChange(field.name, value)}
                        borderColor={PRIMARY_COLOR}
                        labelColor={PRIMARY_COLOR}
                        iconName={field.iconName}
                        secureTextEntry={field.secureText}
                    />
                </View>
            ))}

            <Pressable
                onPress={handleSubmit}
                style={{
                    backgroundColor: PRIMARY_COLOR,
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 15
                }}>
                <Text style={{ color: 'white', fontSize: 22, fontFamily: 'MyFont' }}>Submit</Text>
            </Pressable>

        </View>
    );
};

export default FormComponent;

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
