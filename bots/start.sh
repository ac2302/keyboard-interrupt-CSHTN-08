#!/bin/bash

python3 helpbotfinal/helpbot.py &

python3 progressbotfinal/progressbot.py &

python3 searchbot/searchbot.py &

python3 videobot/videobotfinal.py &

while :
do
	sleep 1
done

