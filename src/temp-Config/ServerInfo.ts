import { Express } from 'express';

interface ServerInfo {
    hostname: string,
    port: number,
    ViewPath: string,
    RouterPath: string,
    setAPI: any
}

const obj: ServerInfo = {
    hostname: `127.0.0.1`,
    port: 3003,
    ViewPath: 'C:/IDE/NodeApp/pwa/dist/',
    RouterPath: './Server/Router/',
    setAPI: async function(app: Express, url: string) { // Router Setting
        const fs = require('fs');
        const _path = require('path');
        const rootPath = _path.join(__dirname, '../');
        let path = _path.join(rootPath, this.RouterPath);

        if(url != undefined) {
            path = _path.join(path, url);
        }

        fs.readdir(path, (err : Error, fileList: Array<string>) => { //
            if(err) {
                throw err;
            } else {
                if(fileList.length === 0) {
                    return;
                } else {
                    let API_URL;
                    let RestAPI_URL;
                    let Router_JS;
                    console.log('# Detecting File:', fileList.length, '#');
                    for(let i = 0; i < fileList.length; i++) {
                        API_URL = path.substring(path.lastIndexOf('Router') + 6, path.length);
                        if(-1 === fileList[i].indexOf('.js') && -1 === fileList[i].indexOf('.ts')) { // js 파일이 아닐 경우 다시 디텍팅
                            this.setAPI(app, _path.join(API_URL, fileList[i]));
                        } else if(-1 < fileList[i].indexOf('.js') || -1 < fileList[i].indexOf('.ts')) { // js 파일이라면 라우팅 use
                            const type = -1 < fileList[i].indexOf('.js') ? '.js' : '.ts';
                            RestAPI_URL = `${url}/${fileList[i].substring(0, fileList[i].indexOf(type))}`;
                            RestAPI_URL = RestAPI_URL.split('\\').join('/');
                            Router_JS = `.${RestAPI_URL}${type}`;
                            Router_JS = Router_JS.split('\\').join('/');
                            console.log('App Router ::', RestAPI_URL, ', File Load ::', Router_JS);
                            app.use(RestAPI_URL, require(_path.join(rootPath, this.RouterPath, Router_JS)));
                        }
                    }
                    // RestAPI Router
                    return;
                }
            }
        })
    }
}

export default obj;
