export default class Service {
    constructor(backendEndpoint) {
        this.backendEndpoint = backendEndpoint;
    }

    // returns true if successfull, false if failed
    async postBackend(recorderBase) {
        const EVENT_CODE = "3LZ3B"
        const NOW = Date.now()
        const RANDOM_NUM = Math.floor(Math.random() * 10000);
        const FILE_NAME = `${NOW}_${EVENT_CODE}_${RANDOM_NUM}.mp3`
        const USER_DATA = JSON.parse(localStorage.getItem('userInfo'))
        if (!USER_DATA) return Promise.reject({ message: 'User data not found' })
        const data = {
            auth: {
                agency: "fd5160347a77476186381cb31bff05ea5ce6421b",
                apiKey: "cfd376a3c2479dde545dd960801d2f0ab3217e06"
            },
            waiverList: {
                event: {
                    uniqueEventCode: EVENT_CODE
                },
                media: {
                    file_count: 1,
                    files: [
                        {
                            name: FILE_NAME,
                            base64: recorderBase
                        }
                    ]
                },
                customers: [
                    {
                        name: "email",
                        value: USER_DATA.email
                    },
                    {
                        name: "FIRST NAME",
                        value: USER_DATA.firstName
                    },
                    {
                        name: "LAST NAME",
                        value: USER_DATA.lastName
                    },
                    {
                        name: "UPLOADED FILE NAME",
                        value: FILE_NAME
                    }
                ]
            }
        };
        try {
            const response = await fetch(this.backendEndpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                return false;
            }
            return await response.json();
        } catch (error) {
            return false;
        }
    }
}