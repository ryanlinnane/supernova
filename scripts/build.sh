echo 'build phase'
git fetch origin
git reset --hard origin/master
echo 'running npm install'
npm install
echo 'copying with gulp...'
node_modules/gulp/bin/gulp.js deploy
echo 'restarting landing'
sudo systemctl restart landing
