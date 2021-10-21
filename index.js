import * as dotenv from "dotenv";
dotenv.config();

import * as child_process from 'child_process';
const execSync = child_process.execSync;

import fetch from 'node-fetch';

const excmd = (cmd) => {
    return execSync(cmd, { encoding: 'utf-8' })
}

const folders = excmd('cd repositories && ls').split("\n").slice(0, -1)

/* const create_repo = (name_repo) => {
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
} */

// const user = process.env.USER_GITHUB

/* const create_repo_local = (name_repo) => {
    const cmd = `cd repositories/${name_repo} && git init && git add . && git commit -m "initial commit" && git remote add origin git@github.com:${user}/${name_repo} && git push origin master`
    excmd(cmd);
    return `carpeta inicializada: ${name_repo}`
} */


const initial_repo = (folder) => {
    const cmd_pull = `cd repositories/${folder} && git init && git remote add origin git@github.com:${process.env.NAME_REPO}/${folder} && git pull origin master`
    excmd(cmd_pull);
    //const cmd_push = `cd repositories/${folder} && git add . && git commit -m "Actualización Shf addons a SHF ODOO" && git push origin master`

}
excmd("cd repositories/a && rm -rf .git");
excmd("cd repositories/b && rm -rf .git");
excmd("cd repositories/c && rm -rf .git");
for (const folder of folders) {
    initial_repo(folder)
}