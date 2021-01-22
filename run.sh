
time=$(date "+%Y-%m-%d %H:%M:%S")

npm run build
cd ../..
git add . 
git commit -m  "xk:update redpacket project at ${time}"
git push 

echo "${time}"