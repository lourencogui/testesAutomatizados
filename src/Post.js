import React from 'react';

import { View, Text, Button } from 'react-native';

const Post = ({ post, onDelete }) => (
    <View>
        <Text>{post.title}</Text>
        <Text>{post.description}</Text>

        <Button title='Delete Post' onPress={() => onDelete(post.id)} />
    </View>
    );
    
export default Post;