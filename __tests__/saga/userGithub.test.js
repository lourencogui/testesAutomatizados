import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import api from '../../src/services/api';
import rootSaga from '../../src/store/sagas';
import * as actions from '../../src/store/userActions';


const userGithubFixture = require('./fixtures/userGithub.json');

describe('Testing User Github SAGA', () => {
    let sagaTester = null;
    let apiMock = null;

    beforeEach(() => {
        sagaTester = new SagaTester({});
        sagaTester.start(rootSaga);
        apiMock = new MockAdapter(api.axiosInstance);
    });

    it('can add user', async () => {
        apiMock.onGet('/users/lourencogui').reply(200, userGithubFixture['/users/lourencogui']);

        sagaTester.dispatch(actions.addUserRequest('lourencogui'));
        await sagaTester.waitFor(actions.addUserSuccess().type);

        expect(sagaTester.getLatestCalledAction()).
            toEqual(actions.addUserSuccess(userGithubFixture['/users/lourencogui']));
    });

    it('throws error when user does not exist', async () => {
        apiMock.onGet('/users/fail').reply(400);

        sagaTester.dispatch(actions.addUserRequest('fail'));
        await sagaTester.waitFor(actions.addUserFailure().type);
        expect(sagaTester.getLatestCalledAction()).
             toEqual(actions.addUserFailure('failed'));
    });

});