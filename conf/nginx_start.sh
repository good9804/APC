@echo off
cd /d %~dp0

cp nginx.conf ..\etc\nginx\

nohup sudo service start nginx
pause