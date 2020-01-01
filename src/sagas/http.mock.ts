import { UserEntity } from '../types/Entities';

module.exports = function () {
    let authenticatedUser: UserEntity = null;
    
    let userId = 2;
    let users: UserEntity[] = [
        {
            id: 1,
            username: 'test',
        }
    ];
    
    function* httpGet(action: string) {
        const split = action.split('/').filter((item) => item !== '');
    
        switch (split[0]) {
            case 'auth':
                if (authenticatedUser && 'password' in authenticatedUser) delete authenticatedUser['password'];
                return {
                    success: true,
                    data: authenticatedUser,
                };
            case 'instance':
                return {
                    success: true,
                    data: {
                        title: 'Photos',
                        allowSignups: true,
                        allowAnonymousUploads: false,
                    }
                }
        }
    }
    
    function* httpPost(action: string, data: any) {
        const split = action.split('/').filter((item) => item !== '');
    
        switch (split[0]) {
            case 'auth':
                if (split[1] && split[1] === 'signup') {
                    users.push({
                        ...data,
                        id: userId,
                    });
                    userId++;
        
                    return {
                        success: true,
                    };
                }
    
                if (data.password === 'test') {
                    
                    authenticatedUser = users.find((user) => user.username === data.username);
                    if (authenticatedUser) {
                        return {
                            success: true,
                            data: 'test',
                        };
                    }
                }
    
                return {
                    success: false,
                };
        }
    }
    
    function* httpDelete(action: string) {
        const split = action.split('/').filter((item) => item !== '');
    
    }

    return {
        httpGet,
        httpPost,
        httpDelete,
    };
};