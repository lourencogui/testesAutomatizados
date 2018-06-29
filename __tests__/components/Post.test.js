import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Text, Button } from 'react-native';

import Post from '../../src/Post';

const post = {
    id: 1,
    title: 'teste',
    description: 'teste desc',
};

describe('Testing post', () => {
    it('can delete post', () => {
        const deletePostSpy = sinon.spy();

        const wrapper = shallow(<Post post={post} onDelete={deletePostSpy} />)
        wrapper.find(Button).simulate('press');

        expect(deletePostSpy.withArgs(post.id).calledOnce).toBe(true);
    });
});