echo 'build phase'
git fetch origin master
git reset --hard origin/master
npm install
gulp deploy
sudo systemctl restart landing
