import * as dotenv from "dotenv";
dotenv.config();

import * as child_process from 'child_process';
const execSync = child_process.execSync;

import fetch from 'node-fetch';

const excmd = (cmd) => {
    return execSync(cmd, { encoding: 'utf-8' })
}

const carpets = excmd('cd repositories && ls').replace(/\n/g, ',').slice(0, -1).split(",")

const create_repo = (name_repo) => {
    const name = name_repo
    return new Promise(async(resolve, reject) => {
        const body = { name };
        console.log(JSON.stringify(body));
        await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', 'Authorization': `token ${process.env.TOKEN_GITHUB}` }
        }).then((data) => {
            console.log(data);
            resolve(data)
        }).catch(err => reject(err))
    })
}

const create_repo_local = (name_repo) => {
    const cmd = `cd repositories/${name_repo} && git init && git add . && git commit -m "initial commit" && git remote add origin git@github.com:backsoul/${name_repo} && git push origin master`
    excmd(cmd);
    return `carpeta inicializada: ${name_repo}`
}

for (const carpet of carpets) {
    create_repo(carpet).then((data) => {
        console.log('====================================');
        console.log(`se creo correctamente el repositorio en github: (${carpet})`);
        console.log('====================================');
        create_repo_local(carpet);
    }).catch((err) => console.log("error al crear carpeta en github..", err));
}