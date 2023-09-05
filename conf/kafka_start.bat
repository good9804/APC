@echo off
cd /d %~dp0
REM the example of running batch files in sequence and in the background

start /B "" cmd /c "cd  ..\kafka&&bin\windows\zookeeper-server-start.bat config\zookeeper.properties"
start /B "" cmd /c "bin\windows\kafka-server-start.bat config\server1.properties"
start /B "" cmd /c "bin\windows\kafka-server-start.bat config\server2.properties"
start /B "" cmd /c "bin\windows\kafka-server-start.bat config\server3.properties"
start /B "" cmd /c "cd  ..\kafka&&nginx -s reload"

pause