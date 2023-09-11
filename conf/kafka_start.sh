#!/bin/bash
cd "$(dirname "$0")"
# 주어진 파일들을 Kafka 설정 디렉토리로 복사
cp zookeeper.properties ../kafka/config/
cp server1.properties ../kafka/config/
cp server2.properties ../kafka/config/
cp server3.properties ../kafka/config/

# 백그라운드에서 Zookeeper와 Kafka 서버를 시작
nohup ../kafka/bin/zookeeper-server-start.sh ../kafka/config/zookeeper.properties > /dev/null 2>&1 &
../kafka/bin/kafka-server-start.sh ../kafka/config/server1.properties > /dev/null 2>&1 &
../kafka/bin/kafka-server-start.sh ../kafka/config/server2.properties > /dev/null 2>&1 &
../kafka/bin/kafka-server-start.sh ../kafka/config/server3.properties > /dev/null 2>&1 &

# 실행을 일시 중지
read -p "Press Enter to exit..."
