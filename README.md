## Simpleprints web labs

Labs for simpleprints - Friend Upload app

## Settings:
- Heroku app: https://dashboard.heroku.com/apps/sp-web
- Sample link: http://labs.getsimpleprints.com/MrbvLIQiBb
- Repo: https://github.com/DesignGarage1/sp-web/

### Purposes
- This is used for friend share in Simpleprints. Assuming that user A has a book and wanna ask friend for uploading more images to this album. However, this user A want to keep his privacy (images in album, ...).


### Design
- Framework: NodeJS - Ember JS
- Link to Ember JS doc: http://emberjs.com/ and http://www.ember-cli.com/

### Run on localhost

Run those commands as follow

- npm install
- bower install

Change line 17,18 in sp-web/app/config/environment.js to 
```
PROXY_URL: process.env.PROXY_URL || 'http://sp-proxy-0.herokuapp.com',
API_URL: process.env.API_URL || 'http://localhost:8000'
```

- ember server

open link http://localhost:4200/ => will see invalid sharing code. This is because we don't input any sharing code.

Then login to local database:
- check if there is any record in `labs_membercode`. If yes, pick a value in a row (me is `oESCG8u4rtU`) and open page: http://localhost:4200/oESCG8u4rtU
- If not, create a new row for a member, pick value <`X`> and open link http://localhost:4200/<X>

