import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/postSlice';
import { PRIMARY_COLOR } from '../component/constant';

const AddPost = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();

    const handleAddPost = () => {
        if (!title || !body) {
            return;
        }

        const newPost = {
            id: Date.now().toString(),
            userId: Math.random(),
            title,
            body,
        };
        dispatch(addPost(newPost));
        setBody('')
        setTitle('')
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Body"
                multiline
                numberOfLines={4}
                value={body}
                onChangeText={(text) => setBody(text)}
            />

            <Pressable
                style={styles.addButton}
                onPress={handleAddPost}
            >
                <Text style={styles.buttonText}>Add Post</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    input: {
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        borderRadius: 5,
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    addButton: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    },
});

export default AddPost;
