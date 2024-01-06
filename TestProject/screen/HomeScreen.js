import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { PRIMARY_COLOR } from '../component/constant';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const postsState = useSelector((state) => state.posts);

    const [data, setData] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const datas = await response.json();
                // console.log(data)
                dispatch(setPosts(datas));
                setData(data)
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <View>
            <FlatList
                data={[...postsState?.posts].reverse()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.body}>{item.body}</Text>
                    </View>
                )}
            />
            <Pressable
                style={styles.addButton}
                onPress={() => navigation.navigate('Add Post')}
            >
                <Text style={styles.buttonText}>Add Post</Text>
            </Pressable>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'MyFont'
    },
    body: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'MyFont'
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'MyFont'
    },
})