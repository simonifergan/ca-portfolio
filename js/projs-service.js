var gProjs;

function createProjs() {
    gProjs = [
        {
            id: 101,
            name: 'Safe Content',
            title: 'Login Page',
            previewDesc: 'A login form that allows admin users to view the user list in different formats.',
            fullDesc: `A login page will direct users to some "secret content". However, users which are
                        authorized as administrators will be granted access to the admin page, where they will
                        be able to see all the existing users in the database. Try it and make sure to login
                        with username: sensation; password: molecule`,
            url: 'projs/101/index.html',
            publishedAt: getTimestampByDate('01-31-2019'),
            labels: ['Interface', 'HTML'], 
        },
        {
            id: 102,
            name: 'Minesweeper',
            title: 'Game',
            previewDesc: 'A minesweeper-esque game with a personal twist.',
            fullDesc: `This project keeps all the minesweeper game-rules from the MS Windows versions.
                        My interpetation is what makes it unique and personal.`,
            url: 'projs/102/index.html',
            publishedAt: getTimestampByDate('01-24-2019'),
            labels: ['Game', 'Javascript', 'Logic'], 
        },
        {
            id: 103,
            name: 'Snake',
            title: 'Game',
            previewDesc: 'Good old Snake.',
            fullDesc: `This game was programmed before I started CodingAcademy's bootcamp. Think about it,
                        I did this when I knew nothing about Javascript. What will I be able to make 
                        when I'll know (almost) everything??`,
            url: 'projs/103/snake.html',
            publishedAt: getTimestampByDate('11-24-2018'),
            labels: ['Game', 'Javascript', 'HTML5Canvas'], 
        },
    ]
}

function getProjById(projId) {
    return gProjs.find(proj => proj.id === projId);
}

function getProjsToDisplay() {
    return gProjs.slice();
}