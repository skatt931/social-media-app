let db = {
    users: [{
        userId: 'rajdf2323jsf244jdfh35ln',
        email: 'email@rm.com',
        handle: 'user',
        createdAt: '2019-03-13T11:46:02.028Z',
        imageUrl: 'image/dfkjdkf/lkjkjciufs',
        bio: 'Hello my name is putin',
        website: 'https://website.com',
        location: 'Lviv, UA'
    }],
    screams: [{
        userHandle: 'user',
        body: 'this is the screem body',
        createdAt: '2019-03-13T11:46:02.028Z',
        likeCount: 5,
        commentCount: 2
    }],
    comments: [{
        userHandle: 'user',
        screamId: 'fkgjsljdf3i4u34',
        body: 'nice one dude!',
        createdAt: '2019-03-13T11:46:02.028Z'
    }]
}
const userDetails = {
    // Redux data
    credentials: {
        userId: 'rajdf2323jsf244jdfh35ln',
        email: 'email@rm.com',
        handle: 'user',
        createdAt: '2019-03-13T11:46:02.028Z',
        imageUrl: 'image/dfkjdkf/lkjkjciufs',
        bio: 'Hello my name is putin',
        website: 'https://website.com',
        location: 'Lviv, UA'
    },
    likes: [{
            userHandle: 'user',
            screamId: 'kdjfkj343434kjdf34'
        },
        {
            userHandle: 'user',
            screamId: 'diufjdhf38747364'
        }
    ]
}