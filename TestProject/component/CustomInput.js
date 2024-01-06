import { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { PRIMARY_COLOR } from '../component/constant';

const CustomInput = ({ containerStyle, placeholder, onChangeText, borderColor, labelColor, iconName, error, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState('');
    const [showPassword, setShowPassword] = useState(props.secureTextEntry);
    const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        animatedLabel(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!text) {
            animatedLabel(0);
        }
    };

    const handleTextChange = (text) => {
        setText(text);
        if (onChangeText) {
            onChangeText(text);
        }
        if (text) {
            animatedLabel(1);
        } else {
            animatedLabel(isFocused ? 1 : 0);
        }
    };

    const animatedLabel = (toValue) => {
        Animated.timing(labelPosition, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const labelStyle = {
        left: 10,
        top: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [22, 0],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 14],
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 2],
            outputRange: [labelColor ? "gray" : labelColor, labelColor ? labelColor : '#442445'],
        }),
        // fontFamily: 'ProductSans-Regular',
    };

    return (
        <View style={containerStyle}>
            <View style={[styles.innerContainer, isFocused && { borderColor: borderColor ? borderColor : '#fafafa' }]}>
                <Animated.Text style={[styles.label, labelStyle]}>{placeholder}</Animated.Text>
                <View style={styles.inputContainer}>
                    <Fontisto style={{ paddingLeft: 10, }} color={isFocused ? PRIMARY_COLOR : 'gray'} name={iconName} size={18} />
                    <TextInput
                        {...props}
                        style={styles.input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={handleTextChange}
                        value={text}
                        textAlignVertical="center"
                        textContentType={props.secureTextEntry ? 'newPassword' : props.secureTextEntry}
                        secureTextEntry={showPassword}
                    />
                    {props.secureTextEntry && !!text && (
                        <View>
                            <TouchableOpacity
                                style={{ width: 24 }}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                {!showPassword ? (
                                    <Icon name="eye-outline" color={'#333333'} size={24} />
                                ) : (
                                    <Icon name="eye-off-outline" color={'#333333'} size={24} />
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        height: 70,
        justifyContent: 'center',
    },
    label: {
        color: '#fafafa',
        marginLeft: 28,
        fontFamily: 'MyFont'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        justifyContent: 'center',
        paddingBottom: 15,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
        color: '#333333',
        fontFamily: 'MyFont'
    },
});

export default CustomInput;
