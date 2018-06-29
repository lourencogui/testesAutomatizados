import React, { Component } from 'react';

import { View, ScrollView, Text, Button, AsyncStorage } from 'react-native';
import Post from './Post';

export default class List extends Component {
    state = {
        posts: [],
    };

    async componentDidMount() {
        const posts = JSON.parse(AsyncStorage.getItem('@posts')) || [];
        this.setState({ posts });
    }

    addNewPost = () => {
        this.setState({
            posts: [
                ...this.state.posts,
                { id: Math.random(), title: 'Novo post', description: 'teste' },
            ]
        });
    };

    savePosts = async () => {
        await AsyncStorage.setItem('@posts', JSON.stringify(this.state.posts));
    };

    deletePost = (id) => {
        this.setState({
            posts: this.state.posts.filter(post => post.id !== id)
        })
    }

    renderPosts = () => (
        <ScrollView>
            {
                this.state.posts.map(post => <Post key={post.id} post={post} onDelete={this.deletePost} />)
            }
        </ScrollView>
    );

    render() {
        return (
            <View>
                {this.state.posts.length > 0
                    ? this.renderPosts()
                    : <Text>Nenhum Post</Text>
                }
                <Button id="new" title='Add new post' onPress={this.addNewPost} />
                <Button id="save" title='Save posts' onPress={this.savePosts} />
            </View>
        );
    }
};